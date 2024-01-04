import {Component} from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";


@Component({
	selector: 'bottom-sheet-parameters',
	styles: [`



  `],
	template: `

<parameters></parameters>


	`
})

export class BottomSheetParametersComponent  {

	constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetParametersComponent>) {
	}

	openLink(event: MouseEvent): void {
		this._bottomSheetRef.dismiss();
		event.preventDefault();
	}


}


