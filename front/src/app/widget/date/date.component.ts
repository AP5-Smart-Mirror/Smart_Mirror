import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {
  currentDate: Date;

  constructor() { }

  ngOnInit(): void {
    this.currentDate = new Date();
  }
}
