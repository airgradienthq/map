import {Component} from '@angular/core';
import {DataServices} from "../../services/data.services";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {ColorsServices} from "../../services/colors.services";
import {DataHistoryServices} from "../../services/data-history.services";
import {AgChartPeriods} from "../../models/airgradient/agChartPeriods";
import {animate, style, transition, trigger} from "@angular/animations";
import {environment} from "../../../environments/environment";

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

			<div fxLayout="row" fxLayoutGap="10px" fxLayoutAlign="center space-between"  >
				<div class="subheader">{{this.dataServices.selectedLocation.publicLocationName}}</div>

				<div fxLayout="column" fxLayoutGap="3px">
					<mat-chip *ngIf="this.dataServices.selectedLocation.atmp">
						{{this.dataServices.selectedLocation.atmp | number : '1.1-1'}}°C | {{this.dataServices.selectedLocation.rhum | number : '1.0-0'}}%
					</mat-chip>

				</div>

			</div>


			<div  fxFill fxLayout.gt-md="row" fxLayout="row" fxLayoutGap="10px" fxLayoutAlign="start start" fxLayoutAlign.gt-md="space-between center">


				<div fxLayoutAlign="center center" fxLayout="column" style="height: 100%; padding: 10px 30px" [style.color]="this.colorServices.getTextColor(this.dataServices.selectedLocation[this.dataServices.currentPara.color])"
						 [style.background-color]="this.dataServices.selectedLocation[this.dataServices.currentPara.color]"
						 class="aq-button">
					<div style="font-size: 36px;  margin-top: 10px">{{this.dataServices.selectedLocation[this.dataServices.currentPara.value] | number : '1.0-0'}}</div>


					<div style="font-size: 12px; margin-top: 10px">{{this.dataServices.currentPara.name}}<br>current</div>

				</div>

			<div>
				<div *ngIf="this.dataServices.selectedLocation.publicPlaceName">Data Owner: {{this.dataServices.selectedLocation.publicPlaceName }}</div>
				<div>Last Update: {{this.dataServices.selectedLocation.timestamp | date:"MM/dd/yy hh:mm" }} </div>
				<div *ngIf="this.dataServices.selectedLocation.apiSource=='ag'">Data Provider: AirGradient</div>
				<div *ngIf="this.dataServices.selectedLocation.apiSource=='oaq'">Data Provider: OpenAQ ({{this.dataServices.selectedLocation.locationId}})</div>
			</div>



			</div>

			<div style="background-color: white;width: 100%;"  >



				<div >
					<div fxFlex="column">
						<div menu fxLayoutAlign="end end">
						<button mat-button
								[matMenuTriggerFor]="appMenu">{{this.historyDataServices?.currentPeriod?.name}}</button>
						</div>


					</div>

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


				<div class="noData" *ngIf="historyDataServices.dataAvailable==false">Currently No Historical Data Available</div>


				<ngx-chartjs *ngIf="historyDataServices.dataAvailable==true" [data]="historyDataServices.chartdata"
							 [options]="historyDataServices.optionsdata"
							 type="bar">

				</ngx-chartjs>


				<div style="height: 5px" *ngIf="historyDataServices.dataAvailable==true">
					<mat-progress-bar *ngIf="!this.historyDataServices.chartdata" mode="indeterminate"></mat-progress-bar>
				</div>
			</div>
		</div>



	`
})

export class BottomSheetLocationComponent {

	constructor(public dataServices: DataServices,
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

	ngOnInit(): void {
		fetch(environment.openAqApiRoot+'/locations/'+this.dataServices.selectedLocation.locationId)
			.then((response) => {
				console.log(response)
				return response.json()
			})
			.then((quotesData) => {
        		console.log(quotesData.results[0].name)
				this.dataServices.selectedLocation.publicLocationName = quotesData.results[0].name;
      });
  }

	showChart(period: AgChartPeriods) {
		this.historyDataServices.getHistory(this.dataServices.selectedLocation, period);
	}


}


