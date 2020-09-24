import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClockService {
  httpClient: HttpClient;
  private url: String = environment.server_base_url;

  constructor() { }

  getClock(): Observable<any> {
    return new Observable(observer => {
      this.httpClient.get( 'https://localhost:3000/api' + '/clock', // this.url + this.objectName,
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
    });
  }
}
