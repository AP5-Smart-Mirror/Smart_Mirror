import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../../services/agenda.service';
import { Agenda } from 'src/app/models/agenda';

@Component({
	selector: 'app-agenda',
	templateUrl: './agenda.component.html',
	styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent implements OnInit {
	loading: boolean;
	agenda: Agenda;

	constructor() {}

	ngOnInit(): void {
		this.loading = true;
		this.agenda = new Agenda();
		this.init();
	}

	init(): void {
		// Données en dur à supprimer
		this.agenda.id = '1';
		this.agenda.subject = 'Sujet de test';
		this.agenda.start = {
			dateTime: Date.now(),
			timeZone: 'FR-fr'
		};
		this.agenda.end = {
			dateTime: Date.now(),
			timeZone: 'FR-fr'
		};
		this.agenda.organizer = {
			name: 'Philippe',
			address: 'philippe.poutou@gmail.com'
		};

		this.loading = false;
	}
}
