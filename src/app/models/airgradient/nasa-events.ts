export interface NasaEvent {
    id: string;
    closed?: boolean;
    title?: string;
    link: string;
    description?: string;
    category: {
        id: string;
        title: string;
    };
    geometry: { coordinates: number[] }[];
    sources: { id: string; url: string }[];
}

export interface FIRMSFireModel {
    latitude: string;
    longitude: string;
    confidence: string;
    acq_date: string;
    acq_time: string;
    bright_ti4: string;
    bright_ti5: string;
    daynight: string;
    frp: string;
    instrument: string;
    satellite: string;
    scan: string;
    track: string;
    version: string;
}
