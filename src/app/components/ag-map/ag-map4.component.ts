import {Component, ElementRef, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {Map, Marker, NavigationControl, AttributionControl} from 'maplibre-gl';
import MaplibreGeocoder from '@maplibre/maplibre-gl-geocoder';
import * as maplibre from 'maplibre-gl';
import {firstValueFrom, Observable, Subject, takeUntil} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ActivatedRoute} from "@angular/router";

import {DataServices} from "../../services/data.services";
import {ColorsServices} from "../../services/colors.services";
import {MapLocation} from "../../models/airgradient/map-location";
import {BottomSheetLocationComponent} from "../ui-components/bottom-sheet-location.component";
import {environment} from "../../../environments/environment";
import {UsAQIServices} from "../../services/usAQI.services";
import {MessageService} from "../../services/message.service";

@Component({
	selector: 'agMap4',
	styleUrls: ['ag-map4.component.scss'],
	templateUrl: 'ag-map4.component.html',
})

export class agMap4Component implements AfterViewInit, OnDestroy {

	private currentLongitude: number = 0;
	private currentLatitide: number = 0;
	private currentZoom: number = 1;
	private currentOrgId: String = "ag";
	private agLocations: MapLocation[];
	private showOaqLayer: boolean = false;
	private geocoderControl: MaplibreGeocoder;
	private destroy$: Subject<void> = new Subject();
	map: Map | undefined;

	@ViewChild('map')
	private mapContainer!: ElementRef<HTMLElement>;

	constructor(private Activatedroute: ActivatedRoute,
				private dataServices: DataServices,
				private _messageService: MessageService,
				private usAqiServices: UsAQIServices,
				private colorServices: ColorsServices,
				public bottomSheet: MatBottomSheet,
				private location: Location,
				private http: HttpClient,
				private ColorService: ColorsServices) {

		this._messageService.listenMessage()
			.pipe(takeUntil(this.destroy$))
			.subscribe((m: String) => {
				if (m == 'openAQLayerOn') {
					this.showOaqLayer = this.dataServices.showOpenAQLocations;
					this.createMap();
					this.saveLocationParams();
				}
			});

	}

	ngAfterViewInit(): void {
		this.Activatedroute.queryParamMap
			.pipe(takeUntil(this.destroy$))
			.subscribe(params => {
				this.dataServices.currentOrgId = params.get('org')||"ag";
				if(this.dataServices.currentOrgId!=null){
					let params = this.Activatedroute.snapshot.queryParamMap;
					this.currentZoom = +params.get('zoom') || 1;
					this.currentLatitide = +params.get('lat') || 0;
					this.currentLongitude = +params.get('long') || 0;
					this.showOaqLayer =  JSON.parse(params.get('showaq')) || false;
					this.dataServices.showOpenAQLocations = this.showOaqLayer;
					this.createMap();
				}
			});
	}

	ngOnDestroy(): void {
		this.map?.remove();
		this.destroy$.next();
		this.destroy$.complete();
	}

	createMap(): void {
		const initialState = {
			lng: this.currentLongitude,
			lat: this.currentLatitide,
			zoom: this.currentZoom
		};

		this.map = new Map({
			container: this.mapContainer.nativeElement,
			style: `https://api.maptiler.com/maps/streets-v2/style.json?key=vMpY3OLoCEkM7LpZcWdr`,
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom,
			attributionControl: false,
		});

		this.map.addControl(new NavigationControl({}), 'top-left');
		this.map.addControl(new AttributionControl({
			customAttribution: '<a href="https://www.airgradient.com/" target="_blank">&copy; AirGradient</a> | <a href="https://www.openaq.org/" target="_blank">&copy; OpenAQ</a>',
			compact: false,
		}));

		this.map.on('mouseenter', 'locations', () => {
			this.map.getCanvas().style.cursor = 'pointer';
		})

		this.map.on('mouseleave', 'locations', () => {
			this.map.getCanvas().style.cursor = '';
		})

		let that = this;
		this.map.on('moveend', () => {

			let zoom = Math.round(that.map.getZoom());
			let lat = Math.round(that.map.getCenter().lat * 1000) / 1000;
			let long = Math.round(that.map.getCenter().lng * 1000) / 1000;

			this.currentZoom = zoom;
			this.currentLatitide = lat;
			this.currentLongitude = long;
			this.saveLocationParams();
		});

		this.map.on('click', 'locations', function (e) {
			const features = e.target.queryRenderedFeatures(e.point);
			const locationsId = features[0].properties['sensor_nodes_id'];
			const providerID = features[0].properties['providers_id'];

			const loc = new MapLocation();
			loc.apiSource = "oaq";
			loc.pm02 = features[0].properties['value'];
			loc.locationId = locationsId;
			loc.providerID = providerID;
			that.dataServices.selectedLocation = loc;
			that.bottomSheet.open(BottomSheetLocationComponent);
		});

		if (this.showOaqLayer) {
			this.map.on("load", () => {
				this.map.addSource("locations", {
					type: "vector",
					tiles: [
						environment.openAqApiRoot+"/locations/tiles/{z}/{x}/{y}.pbf?parameters_id=2&active=true"
					]
				});
				this.map.addLayer({
					id: "locations",
					type: "circle",
					source: "locations",
					"source-layer": "default",
					"paint": {
						"circle-radius": 12,
						"circle-color": ["step",
							['get', 'value'],
							this.ColorService.getPM25Color(10),
							12,
							this.ColorService.getPM25Color(35),
							35.4,
							this.ColorService.getPM25Color(50),
							55.4,
							this.ColorService.getPM25Color(100),
							150.4,
							this.ColorService.getPM25Color(180),
							250.4,
							this.ColorService.getPM25Color(300)
						]
					},
				});
			});
		}
		if (this.geocoderControl) {
			this.map.removeControl(this.geocoderControl);
		}
		this.addControl();
		this.loadDataAG()
	}

	private addControl(): void {
		const geocoderApi = {
			forwardGeocode: async (config) => {
				const features = [];
				try {
					const request =
						`https://nominatim.openstreetmap.org/search?q=${
							config.query
						}&format=geojson&polygon_geojson=1&addressdetails=1`;
					const response = await fetch(request);
					const geojson = await response.json();
					for (const feature of geojson.features) {
						const center = [
							feature.bbox[0] +
							(feature.bbox[2] - feature.bbox[0]) / 2,
							feature.bbox[1] +
							(feature.bbox[3] - feature.bbox[1]) / 2
						];
						const point = {
							type: 'Feature',
							geometry: {
								type: 'Point',
								coordinates: center
							},
							place_name: feature.properties.display_name,
							properties: feature.properties,
							text: feature.properties.display_name,
							place_type: ['place'],
							center
						};
						features.push(point);
					}
				} catch (e) {
					console.error(`Failed to forwardGeocode with error: ${e}`);
				}
				return {
					features
				};
			}
		};

		this.geocoderControl = new MaplibreGeocoder(geocoderApi, {
			showResultsWhileTyping: true,
			zoom: 10,
			debounceSearch: 300,
			maplibregl: maplibre
		});
		this.map.addControl(this.geocoderControl);
	}

	async loadDataAG(): Promise<void> {
		await firstValueFrom(this.getAGRequest())
			.then((data: MapLocation[]) => {
				this.agLocations = data;
				this.agLocations.forEach( (location) => {
					location.apiSource = 'ag';
					if (location.publicLocationName == null) location.publicLocationName = "Public Name not set on Dashboard"
					location.pm02 = Math.round(location.pm02)
					location.pi02 = Math.round(this.usAqiServices.getUSaqi25(location.pm02))
					location.pm02_clr = this.colorServices.getPM25Color(location.pm02)
					if (location.latitude && location.latitude && location.locationName) this.addAQMarker(location);
				});
			});
	}

	getAGRequest(): Observable<any> {
		return this.http.get(environment.agApiRoot+'/public/api/v1/world/locations/measures/current');
	}

	addAQMarker(location: MapLocation): void {
		const that = this;
		const el = document.createElement('div');
		el.className = 'marker';
		el.style.width = "20px";
		el.style.height = "20px";
		el.style.backgroundColor = location.pm02_clr;
		el.addEventListener('click', function () {
			var loc = new MapLocation()
			that.dataServices.selectedLocation = location;
			that.bottomSheet.open(BottomSheetLocationComponent ,
				{ data: {
						location: that.dataServices.selectedLocation
					}
				});
		});

		new Marker(el)
			.setLngLat([location.longitude, location.latitude])
			.addTo(this.map);
	}

	private saveLocationParams(
		zoom = this.currentZoom,
		lat =  this.currentLatitide,
		long = this.currentLongitude
	): void {
		let queryString = `?zoom=${zoom}&lat=${lat}&long=${long}&org=${this.currentOrgId}&showaq=${this.showOaqLayer}`;
		this.location.replaceState("", queryString);
	}

}

