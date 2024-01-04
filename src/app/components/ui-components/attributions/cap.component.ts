import { Component } from '@angular/core';

@Component({
	selector: 'cap',
	styles: [`



  `],
	template: `

		<div fxLayout="row" fxLayoutAlign="space-around center" style="margin-top: 30px " >
			<img width="100px" src="/assets/logos/cap.png"/>
			<img width="100px" src="/assets/logos/ag.svg"/>
		</div>

		<hr>
		<p>This map is a cooperation between AirGradient and Communities Against Pollution, South Africa.</p>
		<hr>
		<h3>Working together for a healthier environment</h3>
		<p>
			Small groups of thoughtful, committed, organised individuals can effect positive beneficial change.
		</p>
		<p>
			We believe that by raising public awareness, collaborating closely with scientists and public authorities, it
			is possible for us to find co-creative solutions, through the implementation of innovative ways of combat
			air pollution, its associated health problems, its regulation and enforcement, and ultimately reducing the
			air pollution to accepted international standards.
		</p>
		<p>
			We aim:
		</p>
		<ul>
			<li>To give communities access to their localised air quality via live visualise data.</li>
			<li>Help educate communities on matters impacting their rights to a healthy environment.</li>
		</ul>

	`
})

export class CapComponent {}


