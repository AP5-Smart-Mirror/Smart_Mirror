import { Component, OnInit } from '@angular/core';
import { Clock } from 'src/app/models/clock';
import { ClockService } from 'src/app/services/clock.service';

@Component({
  selector: 'app-analog-clock',
  templateUrl: './analog-clock.component.html',
  styleUrls: ['./analog-clock.component.css']
})
export class AnalogClockComponent implements OnInit {
    loading: boolean;
    hour : number = 0;
    minute : number = 0;
    second : number = 0;
  constructor(private clockService : ClockService) { }

  ngOnInit(): void {
    this.drawClock();
  }
  
  drawClock() : void{
    
    let canvas = document.getElementById("clock") as HTMLCanvasElement;
    let parent = document.getElementById("analogClock");
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    let ctx = canvas.getContext("2d");
  
    let radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.90
    
    this.drawAnalogClock(ctx, radius);
    setInterval ( () => this.drawAnalogClock(ctx, radius),1000);
    
  }
  
  drawAnalogClock(ctx, radius) : void{
    
    ctx.arc(0, 0, radius, 0 , 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    this.drawFace(ctx, radius);
    this.drawNumbers(ctx, radius);
    this.drawTime(ctx,radius);
    //setInterval(() => this.drawTime,1000);
  }

  drawFace(ctx, radius) : void {
    let grad;
  
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
  
    //Lines to create a gradient effect on the edge of th clock
    //grad = ctx.createRadialGradient(0, 0 ,radius * 0.95, 0, 0, radius * 1.05);
    //grad.addColorStop(0, 'black');
    //grad.addColorStop(0.5, 'white');
    //grad.addColorStop(1, 'black');

    ctx.strokeStyle = grad;
    ctx.lineWidth = radius*0.04;
    ctx.stroke();
  
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
  }
  
  drawNumbers(ctx, radius):void {
    let ang;
    let num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = 'white';
    for(num = 1; num < 13; num++){
      ang = num * Math.PI / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }
  }


  drawTime(ctx, radius):void {
    
    
    this.initClock();
    
    //hour
    this.hour = this.hour % 12;
    this.hour = (this.hour*Math.PI/6)+(this.minute*Math.PI/(6*60))+(this.second*Math.PI/(360*60));
    this.drawHand(ctx, this.hour, radius*0.5, radius*0.07);
    
    //minute
    this.minute = (this.minute*Math.PI/30)+(this.second*Math.PI/(30*60));
    this.drawHand(ctx, this.minute, radius*0.8, radius*0.07);
    // second
    this.second = (this.second*Math.PI/30);
    this.drawHand(ctx, this.second, radius*0.9, radius*0.02);
    
  }

  initClock() : void{
    this.clockService.getClock().subscribe(
    res => {
      this.hour = res.hours;
      this.minute = res.minutes;
      this.second = res.seconds;
    },
    
    () => console.log('HTTP request completed.')
    )
  }
    
  drawHand(ctx, pos, length, width):void {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.strokeStyle = "white";
    
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos); 
  }
}
