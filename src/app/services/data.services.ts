import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

import { MapLocation } from '../models/airgradient/map-location';


@Injectable()
export class DataServices {

	showFiller = false;
	mapLoading$ = new BehaviorSubject<boolean>(false);
	apiLoading$ = new BehaviorSubject<boolean>(false);

	loading$ = combineLatest(this.mapLoading$, this.apiLoading$)
		.pipe(map(([mapLoading, apiLoading]) => {
			return mapLoading || apiLoading;
		}));

	oAQBlacklistIDs = [366891, 65199, 999, 65229, 70086, 274534, 72083, 72915 , 74693, 65176, 161788];

	para:Array<any> = [
		{ value: 'pm02', name: 'PM2.5 μg/m³', color: 'pm02_clr', unit: 'ug', oAQname: 'pm25' },
		{ value: 'pi02', name: 'PM2.5 US AQI', color: 'pm02_clr', unit: 'aqi', oAQname: 'PM2.5' },

		// parameters list can be further extended as below

		// {value: "pm01", name: "PM 1 in μg/m³", color: "pm02_clr", unit: "ug", oAQname: "pm1"},
		// {value: "pm10", name: "PM 10 in μg/m³", color: "pm02_clr", unit: "ug", oAQname: "pm10"},

		// {value: "rhum", name: "Humidity in %", color: null, unit: null, oAQname: "PM2.5"},
		// {value: "atmp", name: "Temperature in °C", color: null, unit: "C", oAQname: "PM2.5"},
		// {value: "atmp_fahrenheit", name: "Temperature in °F", color: null, unit: "F", oAQname: "PM2.5"},
		// {value: "heat_index_celsius", name: "Heat Index in °C", color: "heatindex_clr", unit: "C", oAQname: "PM2.5"},
		// {value: "heat_index_fahrenheit", name: "Heat Index in °F", color: "heatindex_clr", unit: "F", oAQname: "PM2.5"},
	];

	currentPara = this.para[0];
	selectedLocation: MapLocation;
	currentOrgId = 'ag';
	showOpenAQLocations = false;
	showFirmsFires = false;
	showWindLayer = false;

	moveBack(): void {
		//this.airmap.panBy(new Point(- this.oldx, - ( this.oldy -60 )));
	}
}
