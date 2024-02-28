import { Injectable } from '@angular/core';

@Injectable()
export class ColorsServices {

	getColorClosed(color: string): string {
		return this.getBGColor(color) + '66';
	}

	getColorOpen(color: string): string {
		return this.getBGColor(color) + 'bf';
	}

	getTextColor(color: string): string {
		let ret: string;
		switch (color) {
			case 'green':
			case 'yellow':
			case 'lightslategray': {
				ret = '#3d5a80';
				break;
			}
			case 'orange':
			case 'red':
			case 'purple':
			case 'brown':
			case 'blue': {
				ret = '#fff';
				break;
			}
			default: {
				ret = '#fff';
				break;
			}
		}
		return ret
	}

	getPM25Color(pmValue: number): string {
		let ret = '#7f01e2';
		if (pmValue<=12){
			ret = 'green'
		}

		if (pmValue>12 && pmValue<=35.4){
			ret = 'yellow'
		}
		if (pmValue>35.4 && pmValue<=55.4){
			ret = 'orange'
		}
		if (pmValue>55.4 && pmValue<=150.4){
			ret = 'red'
		}
		if (pmValue>150.4 && pmValue<=250.4){
			ret = 'purple'
		}
		if (pmValue>250.4 && pmValue<=1000){
			ret = 'brown'
		}
		return this.getBGColor(ret)
	}

	getBGColor(color: string): string {
		let ret: string;
		switch (color) {
			case 'green': {
				ret = '#1de208';
				break;
			}
			case 'yellow': {
				ret = '#e2e020';
				break;
			}
			case 'orange': {
				ret = '#e26a05';
				break;
			}
			case 'red': {
				ret = '#e20410';
				break;
			}
			case 'purple': {
				ret = '#7f01e2';
				break;
			}
			case 'brown': {
				ret = '#903305';
				break;
			}
			case 'blue': {
				ret = '#166de2';
				break;
			}
			case 'lightslategray': {
				ret = '#778899';
				break;
			}
			default: {
				ret = '#166de2';
				break;
			}
		}
		return ret
	}

	getHeat(T: number, RH: number): number {
		// https://en.wikipedia.org/wiki/Heat_index#Formula
		return Math.round((-8.78469475556 + 1.61139411 * T + 2.33854883889 * RH - 0.14611605 * T * RH - 0.012308094 * T * T - 0.0164248277778 * RH * RH + 0.002211732 * T * T * RH + 0.00072546 * T * RH * RH - 0.000003582 * T * T * RH * RH) * 10) / 10;
	}


}
