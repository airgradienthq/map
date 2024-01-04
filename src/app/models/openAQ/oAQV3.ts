// not completed


export class coordinates {
	latitude: number;
	longitude:number;
}

export class datetime {
	utc: Date;
	local: Date
}

export class resultz {
	id: number;
	name:string;
	datetimeFrom: datetime;
	datetimeTo: datetime;
	coordinates: coordinates;

}

export class oAQV3 {
	results: resultz[];
}




