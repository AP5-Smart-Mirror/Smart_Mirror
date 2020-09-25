import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Clock } from '../../models/clock';
import { map } from 'rxjs/operators';
import { ClockService } from '../../services/clock.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})

export class DateComponent implements OnInit {
  clock: Clock;

  constructor(
    private clockService: ClockService
  ) { }

  ngOnInit(): void {
    this.clock = new Clock();
    this.init();
  }

  init(): void {
    this.clockService.getClock().pipe(
      map(clock => {
        this.clock.dayname = clock.dayname;
        this.clock.day = clock.day;
        this.clock.monthname = clock.monthname;
        this.clock.year = clock.year;
      })
    ).subscribe();
  }
}
