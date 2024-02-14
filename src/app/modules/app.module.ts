import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartjsModule } from '@ctrl/ngx-chartjs';
import { RouterModule } from '@angular/router';

import { AppComponent } from '../app.component';
import { ColorsServices } from '../services/colors.services';
import { DataServices } from '../services/data.services';
import { MaterialModule } from './material.module';
import { DummyComponent } from '../components/ui-components/dummy.component';
import { SideBarComponent } from '../components/ui-components/layout/side-bar.component';
import { HeaderComponent } from '../components/ui-components/layout/header.component';
import { SideNavServices } from '../services/side-nav.services';
import { BottomSheetParametersComponent } from '../components/ui-components/layout/bottom-sheet-parameters.component';
import { BottomSheetLocationComponent } from '../components/ui-components/bottom-sheet-location.component';
import { MessageService } from '../services/message.service';
import { DetectDeviceServices } from '../services/detect-device.services';
import {
	CO2ParametersComponent
} from '../components/ui-components/configuration/parameters.component';
import { DataHistoryServices } from '../services/data-history.services';
import { CapComponent } from '../components/ui-components/attributions/cap.component';
import { AgComponent } from '../components/ui-components/attributions/ag.component';
import { NaritComponent } from '../components/ui-components/attributions/narit.component';
import { TcanComponent } from '../components/ui-components/attributions/tcan.component';
import { SeenComponent } from '../components/ui-components/attributions/seen.component';
import { UsAQIServices } from '../services/usAQI.services';
import { agMap4Component } from '../components/ag-map/ag-map4.component';
import { ConfigModule } from './config.module';
import { DateAgoPipe } from '../services/date-ago.pipe';
import { LayersConfigComponent } from '../components/ui-components/configuration/layers-config.component';

@NgModule({
	declarations: [
		AppComponent,
		agMap4Component,
		DummyComponent,
		SideBarComponent,
		HeaderComponent,
		BottomSheetParametersComponent,
		BottomSheetLocationComponent,
		CO2ParametersComponent,
		LayersConfigComponent,
		CapComponent,
		AgComponent,
		NaritComponent,
		TcanComponent,
		SeenComponent,
		DateAgoPipe
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
		ConfigModule,
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
