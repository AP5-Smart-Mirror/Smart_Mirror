import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Weather } from '../models/weather';
import { WeatherForecast } from '../models/weatherForecast';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private url: string = environment.server_base_url;

  constructor(private httpClient: HttpClient) { }

  getWeather(): Promise<Weather> {
    return new Promise<Weather>((resolve, reject) => {
      this.httpClient.get<Weather>(this.url + '/weather')
        .toPromise()
        .then(
          res => { // Success
          resolve(res);
          },
          msg => { // Error
          reject(msg);
          }
        );
    });
  }
  getWeatherForecast(): Promise<WeatherForecast> {
    return new Promise<WeatherForecast>((resolve, reject) => {
      this.httpClient.get<WeatherForecast>(this.url + '/weather_forecast')
        .toPromise()
        .then(
          res => { // Success
          resolve(res);
          },
          msg => { // Error
          reject(msg);
          }
        );
    });
  }
}
