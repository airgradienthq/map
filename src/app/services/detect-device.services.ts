import {Injectable} from '@angular/core';

@Injectable()
export class DetectDeviceServices {

	public detectMob() {
		return ( ( window.innerWidth <= 800 ) && ( window.innerHeight <= 1000 ) );
	}


}
