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
    this.agenda.toComplete = "RDV coifffeur faire un dégradé du tonnerre t'as vu";
    this.loading = false;
    // this.init();
    // setInterval(() => this.init(), 600000);
  }

  init(): void {
    this.agendaService.getAgenda().then(agenda => {
      this.loading = true;
      // this.agenda.toComplete = agenda.toComplete;
    }).then(() => this.loading = false);
  }

}
