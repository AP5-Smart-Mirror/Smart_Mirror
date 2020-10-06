import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Widget } from '../models/widget';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  private url: string = environment.server_base_url;

  constructor(private httpClient: HttpClient) { }

  getWidgets(id_profile: number): Promise<Widget[]> {
    return new Promise<Widget[]>((resolve, reject) => {
      this.httpClient.get<Widget[]>(this.url + '/widget/' + id_profile)
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
