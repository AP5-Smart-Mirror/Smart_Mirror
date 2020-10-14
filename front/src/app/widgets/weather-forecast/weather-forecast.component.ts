import { Component, OnInit } from "@angular/core";
import { WeatherService } from "../../services/weather.service";
import { WeatherForecast } from "src/app/models/weatherForecast";
import { Hourly } from "src/app/models/hourly";
import { elementAt } from "rxjs/operators";
import { NgForOf } from "@angular/common";

@Component({
  selector: "app-weather-forecast",
  templateUrl: "./weather-forecast.component.html",
  styleUrls: ["./weather-forecast.component.css"],
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
            weatherForecast.current.temp,
            weatherForecast.current.description,
            weatherForecast.current.iconurl
          )
        );
        console.log('weatherForecast', weatherForecast);
        weatherForecast.hourly.forEach((hourly, index) => {
          if (index % 3 === 0 && index !== 0 && index < 15) {
            hourly.dt = new Date(hourly.dt.valueOf() * 1000);
            this.filteredHourly.push(hourly);
          }
        });
        console.log('filteredHourly', this.filteredHourly);
      })
      .then(() => (this.loading = false));
  }
}
