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

	constructor(private agendaService: AgendaService) {}

	ngOnInit(): void {
		this.loading = true;
		this.agenda = new Agenda();
		this.init();
		setInterval(() => this.init(), 600000);
	}

	init(): void {
		/*this.agendaService
			.getAuth()
			.then(() => {
				console.log('auth');
			})
			.then(() => (this.loading = false));

		this.agendaService
			.getAgenda()
			.then((agenda) => {
				console.log('agenda', agenda);
				this.loading = true;
				this.agenda.subject = agenda.subject;
				this.agenda.organizer.name = agenda.organizer.name;
				this.agenda.start = agenda.start;
				this.agenda.end = agenda.end;
			})
			.then(() => (this.loading = false));
			*/

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
