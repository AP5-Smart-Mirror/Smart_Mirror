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
  dayName: String;
  day: number;
  monthName: String;
  year: number;

  constructor(
    private clockService: ClockService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.clockService.getClock().pipe(
      map(clock => {
        this.dayName = clock.dayname;
        this.day = clock.day;
        this.monthName = clock.monthname;
        this.year = clock.year;
      })
    ).subscribe();
  }
}
