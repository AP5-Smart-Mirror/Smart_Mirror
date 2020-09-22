import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {
  // Defini tes variables ici (type-les c'est mieux)
  currentCity: String;

  // La dedans tu fais des imports de services (on ne devrait pas en avoir besoin dans l'immédiat)
  constructor() { }

  //Cette méthode est appelé quand le composant est appelé
  ngOnInit(): void {
  }

  //Défini tes méthodes en dessous

}
