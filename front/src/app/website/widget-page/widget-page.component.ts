import { Component, OnInit } from '@angular/core';
import { WidgetName } from 'src/app/enums/widget-name';
import { Widget } from 'src/app/models/widget';

@Component({
  selector: 'app-widget-page',
  templateUrl: './widget-page.component.html',
  styleUrls: ['./widget-page.component.css']
})
export class WidgetPageComponent implements OnInit {
  widgetName = WidgetName;

  constructor() {}

  ngOnInit(): void {
    
  }

}
