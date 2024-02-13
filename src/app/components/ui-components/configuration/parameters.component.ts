import { Component } from '@angular/core';

import { DataServices } from '../../../services/data.services';
import { MessageService } from '../../../services/message.service';

@Component({
	selector: 'co2-parameters',
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
			<div class="subheader" style="text-align: center" fxFill>Select CO2 Parameter</div>

			<div fxLayoutAlign="center space-around" fxLayout="row wrap">
				<ng-container *ngFor="let par of dataServices.para">
					<div mat-flat-button (click)="setConfiguration(par)" [style.background-color]="par == dataServices.currentPara ? '#ee6c4d' : '#3d5a80'"
						 class="aq-button">
						{{par.name}}
					</div>
				</ng-container>

			</div>
		</div>
		
	`
})

export class CO2ParametersComponent {

	constructor(public dataServices: DataServices, private _messageService: MessageService) {
	}

	public setConfiguration(par): void {
		this.dataServices.currentPara = par;
		localStorage.setItem('para', par.value);
	}
}


