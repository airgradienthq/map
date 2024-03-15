import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
	declarations: [

	],
	imports: [
		MatProgressSpinnerModule,
		MatSidenavModule,
		MatIconModule,
		MatButtonModule,
		BrowserAnimationsModule,
		MatFormFieldModule,
		MatSelectModule,
		MatFormFieldModule,
		MatBottomSheetModule,
		MatSlideToggleModule,
		MatButtonToggleModule,
		MatChipsModule,
		MatMenuModule,
		MatDialogModule,
		MatSnackBarModule,
		MatProgressBarModule,
		MatToolbarModule,
		MatSnackBarModule,
		MatCheckboxModule
	],
	exports: [
		MatProgressSpinnerModule,
		MatSidenavModule,
		MatIconModule,
		MatButtonModule,
		BrowserAnimationsModule,
		MatFormFieldModule,
		MatSelectModule,
		MatFormFieldModule,
		MatBottomSheetModule,
		MatSlideToggleModule,
		MatButtonToggleModule,
		MatChipsModule,
		MatMenuModule,
		MatDialogModule,
		MatSnackBarModule,
		MatProgressBarModule,
		MatToolbarModule,
		MatSnackBarModule,
		MatCheckboxModule
	],
	providers: [],
	bootstrap: [  ]
})
export class MaterialModule { }
