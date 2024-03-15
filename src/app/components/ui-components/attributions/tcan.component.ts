import { Component } from '@angular/core';

@Component({
	selector: 'app-tcan',
	styles: [],
	template: `
		<div style="padding: 20px 20px">

			<div style="width: 100%; text-align: center; margin: 20px">
				<img width="180px" src="/assets/logos/ag.svg"/>
			</div>

			<p>There are still wide areas in the world without a PM2.5 monitor. Help us expand the coverage by deploying an air quality monitor. The map here displays air quality monitors that share their data with openAQ as well as AirGradient monitors.</p>

			<p>AirGradient monitors are open hardware, robust, accurate and affordable. AirGradient works with research institutions globally (e.g. the University of Cambridge) as well as local institutions like the National Astronomical Research Institute in Thailand (NARIT) to ensure that the monitors are accurate.</p>

			<h5>More Information:</h5>
			<ul>
				<li><a target="_blank" href="https://www.airgradient.com/open-airgradient/outdoor/"> AirGradient Outdoor Monitor </a></li>
			</ul>
			<ul>
				<li><a target="_blank" href="https://openaq.org/"> OpenAQ - Worldwide Air Quality Data </a></li>
			</ul>

			<div style="width: 100%; text-align: center">
			<a target="_blank" href="https://www.airgradient.com/open-airgradient/outdoor/"><img class="img-fluid" style="padding:0px; max-width: 300px;" src="https://www.airgradient.com/images/outdoor/outdoor1.png" alt=""></a>
			</div>
			
		</div>
	`
})
export class TcanComponent {}
