import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../../services/agenda.service';
import { Agenda } from 'src/app/models/agenda';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  loading: boolean;
  agenda: Agenda;

  constructor(
    private agendaService: AgendaService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.agenda = new Agenda();
    this.init();
    setInterval(() => this.init(), 600000);
  }

  init(): void {
    this.agendaService.getAgenda().then(agenda => {
      console.log('agenda', agenda);
      this.loading = true;
      this.agenda.name = agenda.name;
      this.agenda.location = agenda.location;
      this.agenda.start = agenda.start;
      this.agenda.end = agenda.end;
    }).then(() => this.loading = false);
  }
}
