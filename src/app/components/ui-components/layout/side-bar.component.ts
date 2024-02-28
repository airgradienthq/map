import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataServices } from '../../../services/data.services';

@Component({
	selector: 'app-side-bar',
	styles: [`



  `],
	template: `


<div style="background-color: #fff; width: 100%; height: 100%">

	<app-ag *ngIf="this.dataServices.currentOrgId==='ag'"></app-ag>
	<app-cap *ngIf="this.dataServices.currentOrgId==='cap'"></app-cap>
	<app-tcan *ngIf="this.dataServices.currentOrgId==='tcan'"></app-tcan>
	<app-narit *ngIf="this.dataServices.currentOrgId==='narit'"></app-narit>
	<app-seen *ngIf="this.dataServices.currentOrgId==='seen'"></app-seen>

</div>


	`
})



export class SideBarComponent {


	constructor(public dataServices: DataServices,
				private Activatedroute:ActivatedRoute) {

		this.Activatedroute.queryParamMap
			.subscribe(params => {
				this.dataServices.currentOrgId = params.get('org')||'ag';
			});
	}

}


