import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Agenda } from '../models/agenda';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private url: string = environment.server_base_url;

  constructor(private httpClient: HttpClient) { }

  getWeather(): Promise<Agenda> {
    return new Promise<Agenda>((resolve, reject) => {
      this.httpClient.get<Agenda>(this.url + '/agenda')
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
