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

  constructor( 
    private weatherService: WeatherService
    ) { }

  ngOnInit(): void {
    this.weather = new Weather();
    this.init();
    setInterval( () => this.init(), 600000);
  }
  init(): void {
  this.weatherService.getWeather().pipe(
    map(weather => {
      this.weather.currenttemp = weather.currenttemp;
      this.weather.city = weather.city;
      this.weather.iconurl = weather.iconurl;
    })
    ).subscribe();
  }
}
