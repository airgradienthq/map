import { Component } from '@angular/core';
import {DataServices} from "../../../services/data.services";
import {SideNavServices} from "../../../services/side-nav.services";

@Component({
	selector: 'header',
	styles: [`


  `],
	template: `

		<mat-toolbar color="primary" >
<!--			<button mat-button class="menu-button" (click)="this.sidenav.toggle()">-->
<!--				<mat-icon>{{ dataServices.showFiller ? 'menu_open' : 'menu' }}</mat-icon>-->
<!--			</button>-->
			<div class="headerText">AirGradient Map</div>
<!--			<div fxLayoutAlign="space-between center" fxLayoutGap="30px">-->
<!--				<img src="/assets/ag.svg" height="60px" alt="">-->
<!--			</div>-->
		</mat-toolbar>

<!--		<div class="header" fxLayout="row" fxLayoutAlign="space-between center">-->
<!--			<button mat-button class="menu-button" (click)="this.sidenav.toggle()">-->
<!--				<mat-icon>{{ dataServices.showFiller ? 'menu_open' : 'menu' }}</mat-icon>-->
<!--			</button>-->
<!--			<div class="headerText">Air Quality Map</div>-->
<!--			<div fxLayoutAlign="space-between center" fxLayoutGap="30px">-->
<!--				<img src="/assets/ag.svg" height="60px" alt="">-->
<!--			</div>-->
<!--		</div>-->


	`
})

export class HeaderComponent {


	constructor(public dataServices: DataServices,
				public sidenav: SideNavServices) {
	}





}


