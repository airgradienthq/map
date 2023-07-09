import { Component } from '@angular/core';
import {DataServices} from "../../../services/data.services";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
	selector: 'bottom-sheet-parameters',
	styles: [`



  `],
	template: `

<parameters></parameters>


	`
})

export class BottomSheetParametersComponent {


	constructor(public dataServices: DataServices, private _bottomSheetRef: MatBottomSheetRef<BottomSheetParametersComponent>) {
	}


	openLink(event: MouseEvent): void {
		this._bottomSheetRef.dismiss();
		event.preventDefault();
	}


}


