import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Widget } from '../models/widget';
import { Configuration } from '../models/configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private url: string = environment.serverBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getConfiguration(idWidget: number): Promise<Configuration> {
    return new Promise<Configuration>((resolve, reject) => {
      this.httpClient.get<Configuration>(this.url + '/configuration/' + idWidget)
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
