import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartOptions, ChartData, Chart, registerables } from 'chart.js';
import { DateTime, Duration } from 'luxon';
import { Observable } from 'rxjs';
import 'chartjs-adapter-luxon';

import { ColorsServices } from './colors.services';
import { DataServices } from './data.services';
import { environment } from '../../environments/environment';
import { AgChartPeriods } from '../models/airgradient/agChartPeriods';
import { MapLocation } from '../models/airgradient/map-location';
import { AgMeasures } from '../models/airgradient/agMeasures';
import { UsAQIServices } from './usAQI.services';
import { openAQhistoryResults } from '../models/openAQ/oAQHistoryV3';

Chart.register(...registerables);

@Injectable()
export class DataHistoryServices {
	dataAvailable: boolean;
	historyOaqTransformedData:AgMeasures[] = [];
	historyAGTransformedData:AgMeasures[] = [];
	measures: AgMeasures[];
	chartdata: ChartData;
	tooManyRequests = false;
	optionsdata : ChartOptions = {};
	chartPeriods: AgChartPeriods[];
	currentPeriod: AgChartPeriods;

  constructor(
		private http: HttpClient,
		private dataServices: DataServices,
		private usAqiServices: UsAQIServices,
		private colors: ColorsServices
	) {
		this.chartPeriods = [
			new AgChartPeriods('Last 48 hours (1 hour)', '1h', '48h','hour', false, false,null, 'hour', Duration.fromObject({ hours: 48 })),
			new AgChartPeriods('Last Week (1 hour)', '1h', '7d','hour', false, false, null,'hour', Duration.fromObject({ days: 7 })),
			new AgChartPeriods('Last 30 days (1 hour)', '1h', '30d','week', true, false, null, 'hour', Duration.fromObject({ days: 30 })),
			new AgChartPeriods('Last 90 days (1 day)', '1d', '90d','month', true, false, null, 'day', Duration.fromObject({ days: 90 })),
			new AgChartPeriods('Last 180 days (1 day)', '1d', '180d','month', true, false, null, 'day', Duration.fromObject({ days: 180 })),
			new AgChartPeriods('Last 360 days (1 day)', '1d', '360d','month', true, false, null, 'day', Duration.fromObject({ days: 360 })),
		];
  }

	getHistory(location: MapLocation, period: AgChartPeriods): void {
		this.chartdata = null;
		this.dataAvailable = true;
		if (period == null) period = this.chartPeriods?.[0];
		this.currentPeriod = period;
		if (location.apiSource == 'oaq') this.getHistoryOaq(location.locationId, period);
		if (location.apiSource == 'ag') this.getHistoryAG(location.locationId, period);
	}

	getHistoryAG(location: number, period: AgChartPeriods): void {
		this.historyAGTransformedData = [];
		this.getHistoryRequestAG(location, period).subscribe((data: any) => {
			data.forEach( (point: any) => {
				const data2: AgMeasures = new AgMeasures('x', point.date, point.value, this.usAqiServices.getUSaqi25(point.value) );
				this.historyAGTransformedData.push(data2);
				console.log(data2)
			});
			this.prepareBarChartData(this.historyAGTransformedData,'pi02' ,100);
		});
	}

	getHistoryRequestAG(location:number, period: AgChartPeriods): Observable<any> {
		return this.http.get(environment.agApiRoot+'/public/api/v1/world/locations/'+location+'/measures/past/buckets/5/pm02');
	}

	// 		return this.http.get('https://api-int.airgradient.com/public/api/v1/experimental/locations/'+location+'/history?bucket=15m&since='+period.since+'&measure='+ this.dataServices.currentPara.value + '&outdoor=true&duringPlaceOpenOnly=false&token='+this.dataServices.AGtoken);
	// }

	getHistoryOaq(location: number, period: AgChartPeriods): void {
	  this.historyOaqTransformedData = [];
		this.tooManyRequests = false;
		this.getHistoryRequestOpenAQ(location, period).subscribe((data: any) => {
			data.results.forEach( (point: openAQhistoryResults) => {
				const data2: AgMeasures = new AgMeasures('x', point.period.datetimeFrom.local, point.value, this.usAqiServices.getUSaqi25(point.value) );
				this.historyOaqTransformedData.push(data2);
			});
			if (data.meta.found==0) {
				console.log('no data')
			}
			this.prepareBarChartData(this.historyOaqTransformedData,this.dataServices.currentPara.value , data.meta.found);
		},
			(error) => {
				this.dataAvailable = false;
				if (error.status === 429) {
					this.tooManyRequests = true;
				}
			});
	}

	getHistoryRequestOpenAQ(location=228551, period: AgChartPeriods): Observable<any> {
		const dateTo = DateTime.now();
		const dateFrom = dateTo.minus(period.duration);
		const params = new URLSearchParams({
			period_name: period.oAqBucket,
			parameters_id: '1',
			date_from: dateFrom.toISO(),
			date_to: dateTo.toISO(),
			limit: '1000',
			page: '1',
		});
		return this.http.get(environment.openAqApiRoot+'/locations/'+location+'/measurements?'+params.toString());
  }


	prepareBarChartData(data: AgMeasures[], measure:string, found: number): void {
		const dates: any[]=[];
		const values: number[]=[];
		const colors: string[]=[];
		if (found==0) {
			this.dataAvailable = false;
			return;
		}

		measure = this.dataServices.currentPara.value;
		this.measures = data;
		this.measures.sort(function(a, b) {
			return  +new Date(a.date) - +new Date(b.date);
		});
		this.measures.forEach((meas) => {
			dates.push(meas.date);
			if ((meas[measure])==0 && (measure=='pm02' || measure=='pi02' || measure=='tvoc' )) {
				values.push(0.4);
				colors.push(this.colors.getPM25Color(0.4));
			} else {
					values.push(meas[measure]);
					colors.push(this.colors.getPM25Color(meas['pm02']));
			}
			if (meas[measure]) this[measure + '_has'] = true;
		});

		let axisLabel='';
		if (measure=='pm02') axisLabel='PM2.5 in μg/m³';
		if (measure=='pi02') axisLabel='PM2.5 in US AQI';
		if (measure=='rhum') axisLabel='Relative Humidity in %';


		this.optionsdata = {
			maintainAspectRatio: true,
			responsive: true,
			scales: {
				x: {
					display: true,
					type: 'time',
					offset: true,
					time: {
						unit: 'day'
					}
				},
				y: {
					display: true,
					grid: {
						drawTicks: false,
						drawOnChartArea: false
					},
					title: {
						display: true,
						text: axisLabel,
					},
					beginAtZero: true,
					suggestedMax: 25
				},
			},
			plugins: {
				legend: {
					display: false
				}
			}
		};

		this.chartdata = {
			labels: dates,
			datasets: [
				{
					categoryPercentage: 1.0,
					minBarLength: 0,
					barPercentage: 1.0,
					data: values,
					fill: false,
					borderWidth: 0,
					backgroundColor: colors,
				}
			],
		};

	}
}
