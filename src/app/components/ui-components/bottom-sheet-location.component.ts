import {Component, Inject, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";

import {DataServices} from "../../services/data.services";
import {ColorsServices} from "../../services/colors.services";
import {DataHistoryServices} from "../../services/data-history.services";
import {AgChartPeriods} from "../../models/airgradient/agChartPeriods";
import {MapLocation} from "../../models/airgradient/map-location";

@Component({
	selector: 'bottom-sheet-location',
	animations: [
		trigger('slideInOut', [
			transition(':enter', [
				style({transform: 'translateY(100%)'}),
				animate('1000ms ease-in', style({transform: 'translateY(0%)'}))
			]),
			transition(':leave', [
				animate('1000ms ease-in', style({transform: 'translateY(100%)'}))
			])
		])
	],
	styles: [`

	  .aq-button {
		color: white;
		background-color: #ee6c4d;
		height: 70px;
		width: 100px;
		padding: 10px;
		border-radius: 2px;
		cursor: pointer;
		text-align: center;
	  }

	  .noData {
		color: white;
		background-color: dodgerblue;
		height: 20px;
		width: 100%;
		text-align: center;
	  }

	`],
	template: `
		<div class="widgetcontainer" fxLayout="column">
			<div fxLayout="row" fxLayoutGap="10px" fxLayoutAlign="center space-between">
				<div *ngIf="this.dataServices.selectedLocation.apiSource=='ag'" class="subheader">{{this.dataServices.selectedLocation.publicLocationName}}</div>
				<div *ngIf="this.dataServices.selectedLocation.apiSource=='oaq'" class="subheader">{{this.locationdata?.results[0]?.name}}</div>

				<div fxLayout="column" fxLayoutGap="3px">
					<mat-chip *ngIf="this.dataServices.selectedLocation.atmp">
						{{this.dataServices.selectedLocation.atmp | number : '1.1-1'}}°C
						| {{this.dataServices.selectedLocation.rhum | number : '1.0-0'}}%
					</mat-chip>
				</div>
			</div>


			<div fxLayoutGap="10px" fxLayoutAlign="space-between center">


				<div fxLayoutAlign="center center" fxLayout="column" style="height: 100%; padding: 10px 30px"
					 [style.color]="this.colorServices.getTextColor(this.dataServices.selectedLocation[this.dataServices.currentPara.color])"
					 [style.background-color]="this.dataServices.selectedLocation[this.dataServices.currentPara.color]"
					 class="aq-button">
					<div
						style="font-size: 36px;  margin-top: 10px">{{this.dataServices.selectedLocation[this.dataServices.currentPara.value] | number : '1.0-0'}}</div>
					<div style="font-size: 12px; margin-top: 10px">{{this.dataServices.currentPara.name}}<br>current
					</div>
				</div>

				<div>
					<div *ngIf="this.dataServices.selectedLocation.publicPlaceName">Data
						Owner: {{this.dataServices.selectedLocation.publicPlaceName }}</div>
					<!--				<div>Last Update: {{this.dataServices.selectedLocation.timestamp | date:"MM/dd/yy hh:mm" }} </div>-->
					<div *ngIf="this.dataServices.selectedLocation.apiSource=='ag'">Source: AirGradient</div>
					<div
						*ngIf="this.dataServices.selectedLocation.apiSource=='oaq' && this.dataServices.selectedLocation.providerID!=215">
						Source: {{this.providerdata?.results[0]?.name}} (via OpenAQ)
					</div>
					<div
						*ngIf="this.dataServices.selectedLocation.apiSource=='oaq' && this.dataServices.selectedLocation.providerID==215">
						Source: <a href="https://www2.purpleair.com/" target="_blank">PurpleAir</a> (via <a href="https://openaq.org/" target="_blank">OpenAQ</a>)
					</div>
				</div>
			</div>

			<div style="background-color: white;width: 100%;">
				
				<div>
					<mat-menu #appMenu="matMenu">
						<div *ngFor="let period of this.historyDataServices.chartPeriods">
							<button mat-menu-item
									fxLayoutAlign="start center" fxLayoutGap="10px"
									(click)="this.showChart(period)">
								{{period.name}}
							</button>
						</div>
					</mat-menu>
				</div>
				
				<div class="noData" *ngIf="historyDataServices.dataAvailable==false">Currently No Historical Data
					Available
				</div>

				<ngx-chartjs *ngIf="historyDataServices.dataAvailable==true" [data]="historyDataServices.chartdata"
							 [options]="historyDataServices.optionsdata"
							 type="bar">

				</ngx-chartjs>

				<div style="height: 5px" *ngIf="historyDataServices.dataAvailable==true">
					<mat-progress-bar *ngIf="!this.historyDataServices.chartdata"
									  mode="indeterminate"></mat-progress-bar>
				</div>
			</div>
		</div>

	`
})

export class BottomSheetLocationComponent implements OnInit {

	providerdata: any;
	locationdata: any;

	constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public location: MapLocation, public dataServices: DataServices,
				public historyDataServices: DataHistoryServices,
				public colorServices: ColorsServices,
				private bottomSheetRef: MatBottomSheetRef<BottomSheetLocationComponent>) {
		this.historyDataServices.getHistory(this.dataServices.selectedLocation, null);
		bottomSheetRef.backdropClick().subscribe(() => {
			dataServices.moveBack();
		});
	}

	openLink(event: MouseEvent): void {
		this.bottomSheetRef.dismiss();
		event.preventDefault();
	}

	showChart(period: AgChartPeriods): void {
		this.historyDataServices.getHistory(this.dataServices.selectedLocation, period);
	}


	ngOnInit(): void {
    	fetch('https://staging.openaq.org/v3/providers/'+this.dataServices.selectedLocation.providerID)
			.then((response) => response.json())
			.then((results) => (this.providerdata = results));
		fetch('https://staging.openaq.org/v3/locations/'+this.dataServices.selectedLocation.locationId)
			.then((response) => response.json())
			.then((results) => (this.locationdata = results));
  }

}


