import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherService } from '../../services/weather.service';
import { Weather } from 'src/app/models/weather';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})
export class MeteoComponent implements OnInit {
  weather: Weather;
  currenttemp: number;
  city: String;
  iconurl: String;

  constructor( 
    private weatherService: WeatherService
    ) { }

  ngOnInit(): void {
    this.init();
  }
  init(): void {
  this.weatherService.getWeather().pipe(
    map(weather => {
      this.currenttemp = weather.currenttemp;
      this.city = weather.city;
      this.iconurl = weather.iconurl;
    })
    ).subscribe();
  }
}