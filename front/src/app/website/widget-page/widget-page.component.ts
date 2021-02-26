import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
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

  constructor() {}

  ngOnInit(): void {
    this.profile = new Profile(null, null, [new Widget(null, WidgetName.date, null), new Widget(null, WidgetName.almanac, null)])
  }

  onSubmit(): void{
    this.profile.widgets = [];
    for(let widget in WidgetName){
      var checkboxValue = (<HTMLInputElement>document.getElementById(WidgetName[widget])).checked;
      if (checkboxValue ===  true){
        this.profile.widgets.push(new Widget(null, WidgetName[widget], null));
      }
    }
    
    console.log(this.profile);
  }

}
