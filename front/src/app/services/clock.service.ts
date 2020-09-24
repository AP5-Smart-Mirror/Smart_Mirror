import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Clock } from '../models/clock';

@Injectable({
  providedIn: 'root'
})
export class ClockService {
  httpClient: HttpClient;
  private url: String = environment.server_base_url;

  constructor() { }

  getClock(): Observable<Clock> {
    return this.httpClient.get<Clock>(this.url + '/clock');
    
    
    /*return new Observable(observer => {
      this.httpClient.get( this.url + '/clock', // this.url + this.objectName,
      {observe: 'response'}).subscribe(page => {
        observer.next(page.body);
      },
      error => {
        if ( error.status === 404 ) {
          observer.next(null);
        } else {
        observer.error(error);
        console.error('Get Clock Error : ' + error.error.error);
        }
      },
      () => {
        observer.complete();
      });
    });*/
  }
}
