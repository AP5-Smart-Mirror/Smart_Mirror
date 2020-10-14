import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherForecast } from 'src/app/models/weatherForecast';
import { Hourly } from 'src/app/models/hourly';
import { elementAt } from 'rxjs/operators';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css'],
})
export class WeatherForecastComponent implements OnInit {
  loading: boolean;
  filteredHourly: Hourly[];
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.loading = true;
    this.filteredHourly = [];

    this.init();
    setInterval(() => this.init(), 600000);
  }
  init(): void {
    this.weatherService
      .getWeatherForecast()
      .then((weatherForecast) => {
        this.loading = true;
        this.filteredHourly.push(
          new Hourly(
            Date.now(),
            weatherForecast.current.temperature,
            weatherForecast.current.description,
            weatherForecast.current.iconUrl
            )
          );
        weatherForecast.hourly.forEach((hourly, index) => {
          if (index % 3 === 0 && index !== 0 && index < 15) {
            hourly.dateTime = new Date (hourly.dateTime.valueOf () * 1000);
            this.filteredHourly.push(hourly);
          }
        });
      })
      .then(() => (this.loading = false));
  }
}
