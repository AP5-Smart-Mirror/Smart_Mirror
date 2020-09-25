import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Weather } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private url: String = environment.server_base_url;

  constructor(private httpClient: HttpClient) { }

  getWeather(): Observable<Weather> {

    return new Observable(observer => {
      this.httpClient.get<Weather>( this.url + '/weather',
      {observe: 'response'}).subscribe(page => {
        observer.next(page.body);
      },
      error => {
        if ( error.status === 404 ) {
          observer.next(null);
        } else {
        observer.error(error);
        console.error('Get Weather Error : ' + error.error.error);
        }
      },
      () => {
        observer.complete();
      });
    });
  }
}
