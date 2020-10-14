import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analog-clock',
  templateUrl: './analog-clock.component.html',
  styleUrls: ['./analog-clock.component.css'],
})
export class AnalogClockComponent implements OnInit {
  date: Date;
  hour: number;
  minute: number;
  second: number;
  constructor() {}

  ngOnInit(): void {
    this.drawClock();
  }

  drawClock(): void {
    const canvas = document.getElementById('clock') as HTMLCanvasElement;
    const parent = document.getElementById('analog-clock');
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight * 0.8;
    const ctx = canvas.getContext('2d');

    let radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.9;

    this.drawAnalogClock(ctx, radius);
    setInterval(() => this.drawAnalogClock(ctx, radius), 1000);
  }

  drawAnalogClock(ctx: any, radius: number): void {
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    this.drawFace(ctx, radius);
    this.drawNumbers(ctx, radius);
    this.drawTime(ctx, radius);
  }

  drawFace(ctx: any, radius: number): void {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.lineWidth = radius * 0.04;
    ctx.stroke();
  }

  drawNumbers(ctx: any, radius: number): void {
    let ang: number;
    let num: number;
    ctx.font = radius * 0.15 + 'px arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    for (num = 1; num < 13; num++) {
      ang = (num * Math.PI) / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }
  }

  drawTime(ctx: any, radius: number): void {
    this.initClock();

    // hour
    this.hour = this.hour % 12;
    this.hour =
      (this.hour * Math.PI) / 6 +
      (this.minute * Math.PI) / (6 * 60) +
      (this.second * Math.PI) / (360 * 60);
    this.drawHand(ctx, this.hour, radius * 0.5, radius * 0.07);

    // minute
    this.minute =
      (this.minute * Math.PI) / 30 + (this.second * Math.PI) / (30 * 60);
    this.drawHand(ctx, this.minute, radius * 0.8, radius * 0.07);
    // second
    this.second = (this.second * Math.PI) / 30;
    this.drawHand(ctx, this.second, radius * 0.9, radius * 0.02);
  }

  initClock(): void {
    this.date = new Date();
    this.hour = this.date.getHours();
    this.minute = this.date.getMinutes();
    this.second = this.date.getSeconds();
  }

  drawHand(ctx: any, pos: any, length: number, width: number): void {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'white';

    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }
}
