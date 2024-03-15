import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { BottomSheetContents } from '../../../models/airgradient/bottom-sheet-contents';


@Component({
	selector: 'app-bottom-sheet-parameters',
	styles: [],
	template: `

		<ng-container [ngSwitch]="data.content">
			<ng-container *ngSwitchCase="bottomSheetContents.layers">
				<app-layers-config></app-layers-config>
			</ng-container>
			<ng-container *ngSwitchCase="bottomSheetContents.co2">
				<app-co2-parameters></app-co2-parameters>
			</ng-container>
		</ng-container>
		
	`
})

export class BottomSheetParametersComponent  {

	public bottomSheetContents = BottomSheetContents;

	constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetParametersComponent>,
				@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
	}

	openLink(event: MouseEvent): void {
		this._bottomSheetRef.dismiss();
		event.preventDefault();
	}


}


