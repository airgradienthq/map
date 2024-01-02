
export class openAQHistory {
	results: openAQhistoryResults;
	meta: meta;
}

export class openAQhistoryResults {
	period: period;
	value: number;
	parameter: parameter;
}

export class period {
	label: string;
	interval: string;
	datetimeFrom: datetime;
	datetimeTo: datetime;
}

export class datetime {
	utc: Date;
	local: Date
}

export class parameter {
	id: number;
	name: string;
	units: string;
}

export class meta {
	found: number;
	name: string;
	license: string
}
