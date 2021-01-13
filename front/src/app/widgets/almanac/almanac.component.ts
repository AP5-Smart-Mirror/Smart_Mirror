import { Component, OnInit } from '@angular/core';
import { WeatherForecast } from 'src/app/models/weatherForecast';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-almanac',
  templateUrl: './almanac.component.html',
  styleUrls: ['./almanac.component.css']
})
export class AlmanacComponent implements OnInit {
  loading: boolean;
  sunrise: Date;
  sunset: Date;
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.loading = true;
    this.sunrise = new Date();
    this.sunset = new Date();
    this.init();
    setInterval(() => this.init(), 600000);
  }

  init(): void {
    this.weatherService
      .getWeatherForecast()
      .then((weatherForecast) => {
        console.log(weatherForecast);
        this.loading = true;
        this.sunrise = new Date(weatherForecast.current.sunrise.valueOf() * 1000);
        this.sunset = new Date(weatherForecast.current.sunset.valueOf() * 1000);
      })
      .then(() => (this.loading = false));
  }
}
