import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { FIRMSFireModel } from '../models/airgradient/nasa-events';

@Injectable({providedIn: 'root'})
export class FirmsFiresServices {

    public firesData: FIRMSFireModel[] = [];

    constructor(private http: HttpClient) {
    }


    public getFirmsFiresData(): Observable<string> {
        return this.http.get(`${environment.firmsNasaUrl}/${environment.firmsNasaApiKey}/VIIRS_SNPP_NRT/world/1`,
            {
                responseType: 'text'
            });
    }

    public formatCsvToJSFireModelArray(scvData: string): FIRMSFireModel[] {
        const csvConvertedToArray = scvData.split('\n').map(v => v.split(','));
        const headers = csvConvertedToArray[0];
        this.firesData = csvConvertedToArray.slice(1).map(row => {
            let obj = {} as FIRMSFireModel;
            for (let i = 0; i < row.length; i++) {
                obj[headers[i]] = row[i];
            }
            return obj;
        });
        return this.firesData;
    }

    public getFireGeoJsonDataFeatures(firesData: FIRMSFireModel[]): any {
        return firesData.map((firePoint: FIRMSFireModel) => {
            return {
                "type": "Feature",
                "geometry": {
                    type: "Point",
                    coordinates: [firePoint.longitude, firePoint.latitude]
                }
            }
        });
    }
}
