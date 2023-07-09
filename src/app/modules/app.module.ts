import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import {HttpClientModule} from "@angular/common/http";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ColorsServices} from "../services/colors.services";
import {FormsModule} from "@angular/forms";
import {DataServices} from "../services/data.services";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "./material.module";
import {DummyComponent} from "../components/ui-components/dummy.component";
import {SideBarComponent} from "../components/ui-components/layout/side-bar.component";
import {HeaderComponent} from "../components/ui-components/layout/header.component";
import {SideNavServices} from "../services/side-nav.services";
import {BottomSheetParametersComponent} from "../components/ui-components/layout/bottom-sheet-parameters.component";
import {BottomSheetLocationComponent} from "../components/ui-components/bottom-sheet-location.component";
import {MessageService} from "../services/message.service";
import {DetectDeviceServices} from "../services/detect-device.services";
import {ParametersComponent} from "../components/ui-components/configuration/parameters.component";
import {ChartjsModule} from "@ctrl/ngx-chartjs";
import {DataHistoryServices} from "../services/data-history.services";
import {RouterModule, Routes} from "@angular/router";
import {CapComponent} from "../components/ui-components/attributions/cap.component";
import {AgComponent} from "../components/ui-components/attributions/ag.component";
import {NaritComponent} from "../components/ui-components/attributions/narit.component";
import {TcanComponent} from "../components/ui-components/attributions/tcan.component";
import {SeenComponent} from "../components/ui-components/attributions/seen.component";
import {UsAQIServices} from "../services/usAQI.services";
import {NgxLeafletLocateModule} from "@runette/ngx-leaflet-locate";
import {NgSelectModule} from "@ng-select/ng-select";
import {agMap4Component} from "../components/ag-map/ag-map4.component";

@NgModule({
	declarations: [
		AppComponent,
		agMap4Component,
		DummyComponent,
		SideBarComponent,
		HeaderComponent,
		BottomSheetParametersComponent,
		BottomSheetLocationComponent,
		ParametersComponent,
		CapComponent,
		AgComponent,
		NaritComponent,
		TcanComponent,
		SeenComponent

	],
	imports: [
		MaterialModule,
		BrowserModule,
		RouterModule.forRoot([]),
		FormsModule,
		HttpClientModule,
		FlexLayoutModule,
		CommonModule,
		FormsModule,
		NgSelectModule,
		FlexLayoutModule,
		ChartjsModule,
		RouterModule,
		NgxLeafletLocateModule
	],
	providers: [
		ColorsServices,
		DataServices,
		DataHistoryServices,
		SideNavServices,
		MessageService,
		DetectDeviceServices,
		UsAQIServices
	],

	bootstrap: [ AppComponent ]
})
export class AppModule { }
