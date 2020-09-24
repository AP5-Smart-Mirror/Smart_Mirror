import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Clock } from '../../models/clock';
import { ClockService } from '../../services/clock.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {
  clock: Observable<Clock>;

  constructor(
    private clockService: ClockService
  ) { }

  ngOnInit(): void {
    this.init()
  }

  init(): void {
    this.clock = this.clockService.getClock();
  }
}
