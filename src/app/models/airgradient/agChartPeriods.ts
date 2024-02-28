import { Duration } from 'luxon';

export class AgChartPeriods {
  constructor(
    public readonly name: string,
    public readonly bucket: string,
    public readonly since: string,
    public readonly chartunit: string,
    public readonly trial_plan_locked: boolean = false,
    public readonly home_plan_locked: boolean = false,
    public readonly maxSpanMinutes: number = 100,
    public readonly oAqBucket: string,
    public readonly duration: Duration
  ) { }
}
