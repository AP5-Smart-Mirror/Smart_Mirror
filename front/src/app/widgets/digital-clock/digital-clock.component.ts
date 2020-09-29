import { Component, OnInit } from '@angular/core';
import { Clock } from 'src/app/models/clock';
import { ClockService } from 'src/app/services/clock.service';

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.css']
})
export class DigitalClockComponent implements OnInit {
  date: number;

  constructor(private clockService : ClockService) {
  }

  ngOnInit(): void {
    this.date = Date.now();
    setInterval( () => this.date = Date.now(), 1000);
  }
}
