import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WidgetName } from 'src/app/enums/widget-name';
import { Profile } from 'src/app/models/profile';
import { Widget } from 'src/app/models/widget';

@Component({
  selector: 'app-widget-page',
  templateUrl: './widget-page.component.html',
  styleUrls: ['./widget-page.component.css']
})

export class WidgetPageComponent implements OnInit {
  widgetName = WidgetName;
  profile: Profile;

  checked = new FormControl(null, null);

  constructor() {}

  ngOnInit(): void {
    this.profile = new Profile(null, null, [new Widget(null, WidgetName.date, null), new Widget(null, WidgetName.almanac, null)])
    this.profile.widgets.forEach(widget => {
      switch (widget.widget) {
        case WidgetName.agenda :
          console.log('Agenda');
          break;
        case WidgetName.almanac :
          console.log('Almanac');
          this.checked.get('checked');
          break;
        case WidgetName.analogClock :
          console.log('Horloge analogique');
          break;
        case WidgetName.date :
          console.log('Date');
          break;
        case WidgetName.digitalClock :
          console.log('Horloge digitale');
          break;
        case WidgetName.mail :
          console.log('Mail');
          break;
        case WidgetName.news :
          console.log('News');
          break;
        case WidgetName.weatherCurrent :
          console.log('Meteo actuelle');
          break;
        case WidgetName.weatherForecast :
          console.log('Meteo prévisions');
          break;
        case WidgetName.weatherWeekend :
          console.log('Meteo week-end');
          break;
      }
    })
  }

  check(): void {
    var test = document.getElementById("nameCheck") as HTMLInputElement;
    console.log(test);
    //test.checked = true;
    
  }

  /*uncheck(): void {
    document.getElementById("nameCheck").checked = false;
  }*/

  onSubmit(): void{
    console.log('Validation OK ');
  }

}
