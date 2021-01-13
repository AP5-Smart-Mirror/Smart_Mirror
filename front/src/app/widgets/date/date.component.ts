import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})

export class DateComponent implements OnInit {
  date: number;

  constructor() { }

  ngOnInit(): void {
    this.date = Date.now();
    setInterval(() => this.date = Date.now(), 5000);
  }
}
