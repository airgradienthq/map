import { Component } from '@angular/core';

import { DataServices } from '../../../services/data.services';
import { MessageService } from '../../../services/message.service';

@Component({
	selector: 'app-layers-config',
	styles: [],
	template: `
		<div 
			class="widgetcontainer"
			fxLayoutAlign="center center"
			fxLayout="column"
			style="padding-bottom: 15px"
			fxLayoutGap="10px"
		>
			
			<div class="subheader" style="text-align: center" fxFill>Select Active Layers</div>

			<div fxLayout="column">
				<mat-checkbox  
					[disabled]="(dataServices.loading$ | async)" 
					[(ngModel)]="this.dataServices.showOpenAQLocations" 
					(ngModelChange)="openAQLayer()"
				>
					Show OpenAQ Monitors
				</mat-checkbox>
			</div>
			<div fxLayout="column">
				<mat-checkbox 
					[disabled]="(dataServices.loading$ | async)" 
					[(ngModel)]="this.dataServices.showFirmsFires" 
					(ngModelChange)="showFirmsFires()"
				>
					Show Active Fires (NASA FIRMS)
				</mat-checkbox>
			</div>
			<div fxLayout="column">
				<mat-checkbox
					[disabled]="(dataServices.loading$ | async)"
					[(ngModel)]="this.dataServices.showWindLayer"
					(ngModelChange)="showWindLayer()"
				>
					Show Wind Directions
				</mat-checkbox>
			</div>
		</div>
		
	`
})

export class LayersConfigComponent {

	constructor(public dataServices: DataServices, private _messageService: MessageService) {
	}

	openAQLayer(): void {
		this._messageService.sendMessage('openAQLayerOn');
	}

	showFirmsFires(): void {
		this._messageService.sendMessage('toggleFirmsFiresLayer');
	}

	showWindLayer(): void {
		this._messageService.sendMessage('toggleWindLayer');
	}
}


