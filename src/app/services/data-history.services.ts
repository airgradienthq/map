import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChartOptions} from "chart.js";
import {ColorsServices} from "./colors.services";
import {DataServices} from "./data.services";
import {environment} from "../../environments/environment";
import {AgChartPeriods} from "../models/airgradient/agChartPeriods";
import {MapLocation} from "../models/airgradient/map-location";
import {AgMeasures} from "../models/airgradient/agMeasures";
import {UsAQIServices} from "./usAQI.services";
import {openAQhistoryResults} from "../models/openAQ/oAQHistoryV3";
import {DateTime, Duration} from "luxon";

@Injectable()
export class DataHistoryServices {

	historyData:any;
	dataAvailable: boolean;
	historyOaqTransformedData:AgMeasures[] = [];
	measures: AgMeasures[];
	chartdata;
	optionsdata : ChartOptions = {};
	chartPeriods: AgChartPeriods[];
	currentPeriod: AgChartPeriods;

  constructor(private http: HttpClient,
			  private dataServices: DataServices,
			  private usAqiServices: UsAQIServices,
			  private colors: ColorsServices) {

	  this.chartPeriods = [
		  // new AgChartPeriods('Last 8 hours (15 min)', '15m', '8h','hour', false, false),
		  new AgChartPeriods('Last 48 hours (1 hour)', '1h', '48h','hour', false, false,null, 'hour', Duration.fromObject({hours: 48})),
		  new AgChartPeriods('Last Week (1 hour)', '1h', '7d','hour', false, false, null,'hour', Duration.fromObject({days: 7})),
		  new AgChartPeriods('Last 30 days (1 hour)', '1h', '30d','week', true, false, null, 'hour', Duration.fromObject({days: 30})),
		  new AgChartPeriods('Last 90 days (1 day)', '1d', '90d','month', true, false, null, 'day', Duration.fromObject({days: 90})),
		  new AgChartPeriods('Last 180 days (1 day)', '1d', '180d','month', true, false, null, 'day', Duration.fromObject({days: 180})),
		  new AgChartPeriods('Last 360 days (1 day)', '1d', '360d','month', true, false, null, 'day', Duration.fromObject({days: 360})),
	  ];
  }


	getHistory(location: MapLocation, period: AgChartPeriods) {
		this.chartdata = null;
		this.dataAvailable = true;
		if (period == null) period = this.chartPeriods[0];
		this.currentPeriod = period;
		console.log("Loc ID: "+location)
		if (location.apiSource == 'oaq') this.getHistoryOaq(location.locationId, period);
		if (location.apiSource == 'ag') this.getHistoryAG(location.locationId, period);
	}

	getHistoryAG(location: number, period: AgChartPeriods){
		this.getHistoryRequestAG(location, period).subscribe((data: any) => {
			this.prepareBarChartData(data, "pi02", 100);
		});
	}

	getHistoryRequestAG(location:number, period: AgChartPeriods) {

		return this.http.get('https://api.airgradient.com/public/api/v1/experimental/locations/'+location+'/history?bucket=15m&since='+period.since+'&measure='+ this.dataServices.currentPara.value + '&outdoor=true&duringPlaceOpenOnly=false&token='+this.dataServices.AGtoken);
	}

	getHistoryOaq(location: number, period: AgChartPeriods){
	  this.historyOaqTransformedData = [];
		this.getHistoryRequestOpenAQ(location, period).subscribe((data: any) => {


			data.results.forEach( (point: openAQhistoryResults) => {
				var data2: AgMeasures = new AgMeasures("x", point.period.datetimeFrom.local, point.value, this.usAqiServices.getUSaqi25(point.value) );
				this.historyOaqTransformedData.push(data2);
			});
			if (data.meta.found==0) {
				console.log("no data")
			}
			this.prepareBarChartData(this.historyOaqTransformedData,"pi02" ,data.meta.found);
		});
	}

	getHistoryRequestOpenAQ(location:number=228551, period: AgChartPeriods) {
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


	prepareBarChartData(data: AgMeasures[], measure:string, found: number){
		let dates: any[]=[];
		let values: number[]=[];
		let colors: string[]=[];

		if (found==0) {
			this.dataAvailable = false;
			return;
		}

		measure = this.dataServices.currentPara.value;

		// if (measure=='pi02' && this.dataServices.selectedLocation.apiSource=='oaq'){
		// 	measure='pm02'
		// }

		this.measures = data;
		this.measures.sort(function(a, b) {
			return  +new Date(a.date) - +new Date(b.date);
		});
		this.measures.forEach((meas) => {
			// console.log(meas);
			dates.push(meas.date);
			// values.push(meas[measure]);
			// colors.push(this.colors.getPM25Color(meas[measure]));

			if ((meas[measure])==0 && (measure=="pm02" || measure=="pi02" || measure=="tvoc" )) {
				values.push(0.4);
			} else {
				// if (measure=='pm02' && this.dataServices.selectedLocation.apiSource=='oaq') {
				// 	values.push(this.usAqiServices.getUSaqi25(meas[measure]));
				// } else {
				// 	values.push(meas[measure]);
				// }
					values.push(meas[measure]);

				if (this.dataServices.selectedLocation.apiSource=='ag'){
					colors.push(this.colors.getColorOpen(meas[measure + "_clr"]));
				} else {
					colors.push(this.colors.getPM25Color(meas[measure]));
				}

			}
			if (meas[measure]) this[measure + "_has"] = true;
		});

		//console.log(dates)

		//console.log(values)


		let axisLabel="";
		if (measure=="pm02") axisLabel="PM2.5 in μg/m³";
		if (measure=="pi02") axisLabel="PM2.5 in US AQI";
		// if (measure=="rco2") axisLabel="CO2 in ppm";
		// if (measure=="tvoc") axisLabel="TVOC (Ind30)";
		if (measure=="rhum") axisLabel="Relative Humidity in %";


		this.optionsdata={
			maintainAspectRatio: true,
			responsive: true,
			legend: {
				display: false
			},

			scales: {
				xAxes: [{
					display: true,
					type: 'time',
				}],
				yAxes: [{
					id: 'A',
					display: true,
					gridLines: {
						drawTicks: false,
						drawOnChartArea: false
					},
					scaleLabel: {
						display: true,
						labelString: axisLabel,
					},
					ticks: {
						suggestedMax: 25,
						beginAtZero: true
					}
				}]
			}
		};

		this.chartdata = {
			labels: dates,
			fill: false,
			datasets: [
				{
					yAxisID: 'A',
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
