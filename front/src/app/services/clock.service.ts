import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Clock } from '../models/clock';

@Injectable({
  providedIn: 'root'
})
export class ClockService {
  private url: String = environment.server_base_url;

  constructor(private httpClient: HttpClient) { }

  getClock(): Observable<Clock> {

    return new Observable(observer => {
      this.httpClient.get<Clock>( this.url + '/clock',
      {observe: 'response'}).subscribe(page => {
        observer.next(page.body);
        console.log(page.body);
      },
      error => {
        observer.error(error);
        console.error('Get Clock Error', error.status, error.message);
      },
      () => {
        observer.complete();
      });
    });
  }
}
