import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from "@angular/material/bottom-sheet";

import { BottomSheetContents } from '../../../models/airgradient/bottom-sheet-contents';


@Component({
	selector: 'bottom-sheet-parameters',
	styles: [`
		
  `],
	template: `

		<ng-container [ngSwitch]="data.content">
			<ng-container *ngSwitchCase="bottomSheetContents.layers">
				<layers-config></layers-config>
			</ng-container>
			<ng-container *ngSwitchCase="bottomSheetContents.co2">
				<co2-parameters></co2-parameters>
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


