import { Component } from '@angular/core';

import {DataServices} from "../../../services/data.services";
import {MessageService} from "../../../services/message.service";

@Component({
	selector: 'parameters',
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
		margin: 10px;
	  }

  `],
	template: `
		<div class="widgetcontainer" fxLayoutAlign="center center" fxLayout="column" fxLayoutGap="30px">
			<div class="subheader" style="text-align: center" fxFill>Select Air Quality Parameter</div>

			<!-- Parameters logic can be further extended to include temperature and other params-->
			
<!--			<div fxLayout="column" fxLayout.gt-md="row" fxLayoutAlign="center space-around" fxLayoutGap="30px">-->

<!--				<div fxLayout="column">-->
<!--					<div class="label">PM Unit</div>-->
<!--					<mat-button-toggle-group name="fontStyle" [(ngModel)]="pmMetric" aria-label="Font Style">-->
<!--						<mat-button-toggle value="aqi">US AQI</mat-button-toggle>-->
<!--						<mat-button-toggle value="ug">μg/m³</mat-button-toggle>-->
<!--					</mat-button-toggle-group>-->
<!--				</div>-->

<!--				<div fxLayout="column">-->
<!--					<div class="label">Temperature Unit</div>-->
<!--					<mat-button-toggle-group [(ngModel)]="tempMetric"  name="fontStyle" aria-label="Font Style">-->
<!--						<mat-button-toggle value="C">Celcius °C</mat-button-toggle>-->
<!--						<mat-button-toggle value="F">Fahrenheit °F</mat-button-toggle>-->
<!--					</mat-button-toggle-group>-->
<!--				</div>-->

<!--			</div>-->

			<div fxLayout="column">
				<mat-checkbox [(ngModel)]="this.dataServices.showOpenAQLocations" (ngModelChange)="openAQLayer()">
					Show OpenAQ Monitors
				</mat-checkbox>
			</div>


			<div fxLayoutAlign="center space-around" fxLayout="row wrap">
				<ng-container *ngFor="let par of dataServices.para">
<!--					<div *ngIf="par.unit == this.pmMetric-->
<!--					|| par.unit == this.tempMetric || par.unit == null"-->
<!--						 (click)="dataServices.currentPara=par; dataServices.addMarkers() ">-->
					<div mat-flat-button (click)="setConfiguration(par)" [style.background-color]="par == dataServices.currentPara ? '#ee6c4d' : '#3d5a80'"
						 class="aq-button">
						{{par.name}}
					</div>
<!--					</div>-->
				</ng-container>

			</div>
		</div>


	`
})

export class ParametersComponent {

	public tempMetric="C";
	public pmMetric="ug";
	public openAQ:boolean=false;

	constructor(public dataServices: DataServices, private _messageService: MessageService) {
	}

	public setConfiguration(par): void {
		this.dataServices.currentPara = par;
		localStorage.setItem('para', par.value);
	}

	openAQLayer(): void {
		this._messageService.sendMessage('openAQLayerOn');
	}


}


