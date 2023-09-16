import {Component, ElementRef, NgZone, ViewChild, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {Map, Marker, NavigationControl, AttributionControl} from 'maplibre-gl';
import {DataServices} from "../../services/data.services";
import {DetectDeviceServices} from "../../services/detect-device.services";
import {ActivatedRoute, Router} from "@angular/router";
import {ColorsServices} from "../../services/colors.services";
import {MapLocation} from "../../models/airgradient/map-location";
import {BottomSheetLocationComponent} from "../ui-components/bottom-sheet-location.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {Location} from "@angular/common";
import {environment} from "../../../environments/environment";
import {UsAQIServices} from "../../services/usAQI.services";
import {HttpClient} from "@angular/common/http";
import { firstValueFrom } from 'rxjs';
import {MessageService} from "../../services/message.service";

@Component({
	selector: 'agMap4',
	styleUrls: ['ag-map4.component.scss'],
	templateUrl: 'ag-map4.component.html',
})

export class agMap4Component implements OnInit, AfterViewInit, OnDestroy  {

	private currentLongitude:number = 0;
	private currentLatitide:number = 0;
	private currentZoom:number = 1;
	private currentOrgId: String = "ag";
	private agLocations: MapLocation[];
	private showOaqLayer: boolean = false;

	// public selectedLocation: any = [];
	autocompleteLocations: any;

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
				private ColorService: ColorsServices,
				public detectDevice: DetectDeviceServices) {

		 this._messageService.listenMessage().subscribe((m: String) => {
      if (m == 'openAQLayerOn') {
        this.showOaqLayer = this.dataServices.showOpenAQLocations;
		this.showOaqLayer = this.dataServices.showOpenAQLocations;
		this.createMap();
      }

    });

	}

	ngOnInit() {

	}

	ngAfterViewInit() {
		this.Activatedroute.queryParamMap
			.subscribe(params => {
				this.dataServices.currentOrgId = params.get('org')||"ag";
				console.log("org2: "+params.get('org')||"ag")
				if(this.dataServices.currentOrgId!=null){
					let params = this.Activatedroute.snapshot.queryParamMap;
					console.log("dataServices.loadData 2");
					this.currentZoom = +params.get('zoom') || 1;
					this.currentLatitide = +params.get('lat') || 0;
					this.currentLongitude = +params.get('long') || 0;
					console.log("params.get('showOaqLayer'): xx ")
					console.log("params.get('showOaqLayer'): " +this.Activatedroute.queryParams['zoom'])
					if (params.get('showOaqLayer')=='true'){
						this.showOaqLayer = true
					} else {
						this.showOaqLayer = false
					}
					this.dataServices.showOpenAQLocations = this.showOaqLayer;
					let AGtoken = params.get('AGtoken');
					if (AGtoken != null) {
						this.dataServices.AGtoken = AGtoken;
						console.log("tkkk: " + this.dataServices.AGtoken)
					}
					this.createMap();
				}
			});
	}

	createMap() {
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
			customAttribution: '<a href="https://www.openaq.org/" target="_blank">&copy; OpenAQ</a>',
			compact: false,
			}));


		this.map.on('mouseenter', 'locations', () => {
			console.log("ss")
			this.map.getCanvas().style.cursor = 'pointer'
		})

		this.map.on('mouseleave', 'locations', () => {
			console.log("tt")
			this.map.getCanvas().style.cursor = ''
		})

		let that = this;
		this.map.on('moveend', function () {
			console.log('Zoom. ' + Math.round(that.map.getZoom()));
			console.log('Lat. ' + Math.round(that.map.getCenter().lat * 1000) / 1000);
			console.log('Long. ' + Math.round(that.map.getCenter().lng * 1000) / 1000);

			let zoom = Math.round(that.map.getZoom());
			let lat = Math.round(that.map.getCenter().lat * 1000) / 1000;
			let long = Math.round(that.map.getCenter().lng * 1000) / 1000
			let org = that.currentOrgId;
			let token = that.dataServices.AGtoken
			let OaqLayer = that.showOaqLayer
			let queryString = '?zoom=' + zoom + '&lat=' + lat + '&long=' + long + '&org=' + org + '&AGtoken=' + token + '&showOaqLayer='+ OaqLayer;

			that.location.replaceState("", queryString);
		});

		this.map.on('click', 'locations', function (e) {
			const features = e.target.queryRenderedFeatures(e.point);
			const locationsId = features[0].properties['sensor_nodes_id'];
			console.log(features[0]);

			var loc = new MapLocation()
			loc.apiSource = "oaq";
			loc.pm02 = features[0].properties['value'];
			loc.locationId = locationsId;
			that.dataServices.selectedLocation = loc;
			that.bottomSheet.open(BottomSheetLocationComponent);
		});

		console.log("this.showOaqLayer: "+this.showOaqLayer)
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
		this.loadDataAG();
	}

	ngOnDestroy() {
		this.map?.remove();
	}

	logData(strx: string) {
		console.log("cns: " + strx)
		return "#ffffff"
	}


	

	async loadDataAG(){
		await firstValueFrom(this.getAGRequest())
			.then((data: MapLocation[]) => {
				this.agLocations = data;
				this.agLocations.forEach( (location) => {
					location.apiSource = 'ag';
					if (location.publicLocationName == null) location.publicLocationName = "Public Name not set on Dashboard"

						console.log("sss: "+location.publicLocationName)
					location.pm02 = Math.round(location.pm02)
					location.pi02 = Math.round(this.usAqiServices.getUSaqi25(location.pm02))
					location.pm02_clr = this.colorServices.getPM25Color(location.pm02)
					if (location.latitude && location.latitude && location.locationName) this.addAQMarker(location);
				});
			});
	}

	getAGRequest() {
		return this.http.get('https://api.airgradient.com/public/api/v1/world/locations/measures/current?token='+ this.dataServices.AGtoken);
	}

	addAQMarker(location: MapLocation) {
		var that = this
		var el = document.createElement('div');
		el.className = 'marker';
		el.style.width = "20px"
		el.style.height = "20px"
		el.style.backgroundColor = location.pm02_clr;
		el.addEventListener('click', function () {
			var loc = new MapLocation()
						loc.apiSource = "oaq";
						loc.pm02 = location.pm02;
						loc.locationId = location.locationId;
						that.dataServices.selectedLocation = location;
						that.bottomSheet.open(BottomSheetLocationComponent);
			console.log("clicked")
		});

     new Marker(el)
      .setLngLat([location.longitude, location.latitude])
      .addTo(this.map);
	}

}


