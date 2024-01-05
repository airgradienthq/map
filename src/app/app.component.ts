import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {MatSidenav} from "@angular/material/sidenav";

import {DataServices} from "./services/data.services";
import {SideNavServices} from "./services/side-nav.services";
import {BottomSheetParametersComponent} from "./components/ui-components/layout/bottom-sheet-parameters.component";

@Component({
	selector: 'app-root',
	styles: [`

	  .containerx {
		width: 100%;
		height: 100%;
		border: 1px solid rgba(0, 0, 0, 0.5);
	  }

	  .sidenav-content {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
	  }

	  .sidenav {
		padding: 20px;
		max-width: 50%;
		z-index: 2000 !important;
	  }

	  @media only screen and (max-width: 600px) {
		.sidenav {
		  padding: 10px;
		  max-width: 100%;
		  z-index: 2000 !important;
		}
	  }

	  .aq-button {
		position: absolute;
		top: 60px;
		right: 10px;
		color: white;
		background-color: #ee6c4d;
		height: 70px;
		width: 100px;
		padding: 10px;
		border-radius: 2px;
		cursor: pointer;
		text-align: center;
	  }

	  .menuButton {
		position: absolute;
		top: 12px;
		right: 10px;
		z-index: 1100;
		color: black;
		background-color: white;
		padding: 5px;
		border-radius: 2px;
		cursor: pointer;
		text-align: center;
		box-shadow: 0 0 10px 2px rgb(0 0 0 / 20%);
	  }

  `],
	template: `
<!--		<header *ngIf="!detectDevice.detectMob()"></header>-->
<!--		<header></header>-->

			<div class="menuButton" (click)="this.sidenav.toggle()" fxLayoutAlign="center center">
				<mat-icon style="color: black">{{ dataServices.showFiller ? 'menu_open' : 'menu' }}</mat-icon>
			</div>

		<mat-drawer-container class="containerx" autosize>
			<mat-drawer #sidenav class="sidenav" mode="side" style="z-index: 3000 !important;">
				<side-bar style="z-index: 3000 !important;"></side-bar>
			</mat-drawer>
			<agMap4></agMap4>
			<div class="aq-button" fxLayoutAlign="center center" (click)="openBottomSheetParameters()">
				{{dataServices.currentPara.name}}
			</div>
		</mat-drawer-container>
	`
})

export class AppComponent implements AfterViewInit {

	@ViewChild('sidenav') public sidenav: MatSidenav;
	@ViewChild('xxx', {read: ViewContainerRef}) containerRef;


	constructor(public dataServices: DataServices,
				private sideNavService: SideNavServices,
				private bottomSheet: MatBottomSheet) {


		dataServices.para.forEach( (para) => {
			if (para.value == localStorage.getItem('para')) {
				this.dataServices.currentPara = para;
			}
		})
	}

	ngAfterViewInit(): void {
		this.sideNavService.setSidenav(this.sidenav);
	}

	openBottomSheetParameters(): void {
		this.bottomSheet.open(BottomSheetParametersComponent);
	}
}

