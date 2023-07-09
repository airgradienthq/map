export class AgChartPeriods {
  name: string;
  bucket: string;
  since: string;
  chartunit:any;
  trial_plan_locked: boolean;
  home_plan_locked: boolean;
  maxSpanMinutes: number;
  oAqBucket: string;
  momentBucket: any;
  momentBucketDeduct: number;

  constructor(name:string, bucket: string, since: string, chartunit:string, trial_plan_locked:boolean=false, home_plan_locked:boolean=false, maxSpanMinutes:number=100, openAQBucket: string, momentBucket: any, momentBucketDeduct: number) {
    this.name=name;
    this.bucket=bucket;
    this.since=since;
    this.chartunit=chartunit;
    this.chartunit=chartunit;
    this.trial_plan_locked=trial_plan_locked;
    this.home_plan_locked=home_plan_locked;
    this.maxSpanMinutes=maxSpanMinutes;
	this.oAqBucket=openAQBucket;
	this.momentBucket = momentBucket;
	this.momentBucketDeduct = momentBucketDeduct;
  }

}
