export class MapLocation {
  //locations: Locations;
  locationName: string;
  publicLocationName: string;
  publicPlaceName:string;
  publicPlaceUrl:string;
  locationId: number;
  providerID: number;
  latitude: number;
  longitude: number;
  pm01: number;
  pm02: number;
  pm02_clr: string;
  pm02_lbl: string;
  pm10: number;
  pi02: number;
  pi02_clr: string;
  pi02_lbl: string;
  atmp: number;
  atmp_fahrenheit: number;

  heat_index_celsius: number;
  heat_index_fahrenheit: number;
  heatindex_clr: string;
  heatindex_lbl: string;

  rhum: number;
  tvoc: number;
  tvocIndex: number;
  tvoc_clr: string;
  tvoc_idx: number;
  tvoc_lbl: string;

  noxIndex: number;
  firmwareVersion: string;
  timestamp: Date;
  offline: boolean;
  wifi: number;

  highlighted: boolean;

  apiSource: string;
}



