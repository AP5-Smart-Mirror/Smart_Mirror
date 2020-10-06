import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Weather } from 'src/app/models/weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  loading: boolean;
  weather: Weather;

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.weather = new Weather();
    this.init();
    setInterval(() => this.init(), 600000);
  }

  init(): void {
    this.weatherService.getWeather().then(weather => {
      this.loading = true;
      this.weather.currenttemp = weather.currenttemp;
      this.weather.city = weather.city;
      this.weather.iconurl = weather.iconurl;
    }).then(() => this.loading = false);
  }
}
