export class AgMeasures {

  name:string;
  location_id: number;
  date: Date;
  occupied: boolean;
  occu: number;
  open:boolean;
  test:boolean;
  wifi: number;
  testMessage: string;
  notes: string;

  type: string;

  pm01: number;
  pm01_aqi: number;
  pm01_clr: string;
  pm01_lbl: string;

  pm02: number;
  pm02_aqi: number;
  pm02_clr: string;
  pm02_lbl: string;

  pi02: number=0;
  pi02_clr: string;
  pi02_lbl: string;
  pi02_max: number;
  pi02_min: number;


  pm10: number=0;
  pm10_aqi: number;
  pm10_clr: string;
  pm10_lbl: string;

  atmp: number;
  atmp_clr: string;
  atmp_lbl: string;

  rhum: number;
  rhum_clr: string;
  rhum_lbl: string;

  rco2: number;
  rco2_clr: string;
  rco2_lbl: string;

  fan: number;
  tacho: number;

  timestamp: number;
  offline:boolean;

  tvoc: number;
  tvoc_clr: string;
  tvoc_lbl: string;

  heat_index_celsius: number;
  heat_index_fahrenheit: number;
  heatindex_clr: string;

  averaged_records: number;



  constructor(name:string, date: any, pm02: number, pi02: number) {
    this.pm02=pm02;
	this.date=date;
	this.name=name;
    this.pi02=pi02;
    this.rco2=0;
    this.rhum=0;
    this.atmp=0;
    this.fan=0;
    this.tacho=0;
  }

}
