import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Daily } from 'src/app/models/daily';

@Component({
	selector: 'app-weather-weekend',
	templateUrl: './weather-weekend.component.html',
	styleUrls: ['./weather-weekend.component.css'],
})
export class WeatherWeekendComponent implements OnInit {
	loading: boolean;
	filteredDaily: Daily[];
	constructor(private weatherService: WeatherService) {}

	ngOnInit(): void {
		this.loading = true;
		this.init();
		setInterval(() => this.init(), 600000);
	}

	init(): void {
		this.filteredDaily = [];
		this.weatherService
			.getWeatherForecast()
			.then((weatherForecast) => {
				this.loading = true;
				weatherForecast.daily.forEach((daily) => {
					const dateTmp = new Date(daily.dt.valueOf() * 1000).getDay();
					const dayTmp = new Date(daily.dt.valueOf() * 1000).getDate();
					const actualDay = new Date().getDate();
					if ((dateTmp === 0 || dateTmp === 6) && dayTmp !== actualDay) {
						daily.dt = new Date(daily.dt.valueOf() * 1000);
						this.filteredDaily.push(daily);
					}
				});
			})
			.then(() => (this.loading = false));
	}
}
