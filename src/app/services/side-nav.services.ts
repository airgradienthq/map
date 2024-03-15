import { Injectable } from '@angular/core';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';

@Injectable()
export class SideNavServices {

	private sidenav: MatSidenav;


	public setSidenav(sidenav: MatSidenav): void {
		this.sidenav = sidenav;
	}

	public open():  Promise<MatDrawerToggleResult> {
		return this.sidenav.open();
	}


	public close(): Promise<MatDrawerToggleResult> {
		return this.sidenav.close();
	}

	public toggle(): void {
		this.sidenav.toggle();
	}


}
