import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.css']
})
export class DigitalClockComponent implements OnInit {
  date: number;

  constructor() {
  }

  ngOnInit(): void {
    this.date = Date.now();
    setInterval( () => this.date = Date.now(), 1000);
  }
}
