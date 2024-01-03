import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {DataServices} from "../../../services/data.services";

@Component({
	selector: 'side-bar',
	styles: [`



  `],
	template: `


<div style="background-color: #fff; width: 100%; height: 100%">

	<ag *ngIf="this.dataServices.currentOrgId=='ag'"></ag>
	<cap *ngIf="this.dataServices.currentOrgId=='cap'"></cap>
	<tcan *ngIf="this.dataServices.currentOrgId=='tcan'"></tcan>
	<narit *ngIf="this.dataServices.currentOrgId=='narit'"></narit>
	<seen *ngIf="this.dataServices.currentOrgId=='seen'"></seen>

</div>


	`
})



export class SideBarComponent {


	constructor(public dataServices: DataServices,
				private Activatedroute:ActivatedRoute) {

		this.Activatedroute.queryParamMap
			.subscribe(params => {
				this.dataServices.currentOrgId = params.get('org')||"ag";
			});
	}

}


