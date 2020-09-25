import { Component, OnInit } from '@angular/core';
import { Clock } from 'src/app/models/clock';
import { ClockService } from 'src/app/services/clock.service';

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.css']
})
export class DigitalClockComponent implements OnInit {
  clock : Clock;

  constructor(private clockService : ClockService) {
  }

  ngOnInit(): void {
    this.clock = new Clock();
    this.init();
    setInterval( () => this.init(), 1000);
  }

  init() : void{
    this.clockService.getClock().subscribe(
      res => {
        this.clock.hours = res.hours;
        this.clock.minutes = res.minutes;
        this.clock.seconds = res.seconds;
      },
      err => {
        this.clock.hours = 0;
        this.clock.minutes = 0;
        this.clock.seconds = 0;
      },
      () => console.log('HTTP request completed.')
    );
  }

}
