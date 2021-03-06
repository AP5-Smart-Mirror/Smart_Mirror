import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Weather } from 'src/app/models/weather';

@Component({
	selector: 'app-weather-current',
	templateUrl: './weather-current.component.html',
	styleUrls: ['./weather-current.component.css'],
})
export class WeatherCurrentComponent implements OnInit {
	loading: boolean;
	weather: Weather;

	constructor(private weatherService: WeatherService) {}

	ngOnInit(): void {
		this.loading = true;
		this.init();
		setInterval(() => this.init(), 600000);
	}

	init(): void {
		this.weather = new Weather();
		this.weatherService
			.getWeather()
			.then((weather) => {
				this.loading = true;
				this.weather.currenttemp = weather.currenttemp;
				this.weather.city = weather.city;
				this.weather.iconurl = weather.iconurl;
			})
			.then(() => (this.loading = false));
	}
}
