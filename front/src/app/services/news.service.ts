import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { News } from '../models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private url: string = environment.server_base_url;

  constructor(private httpClient: HttpClient) { }

  getNews(): Promise<News[]> {
    return new Promise<News[]>((resolve, reject) => {
      this.httpClient.get<News[]>(this.url + '/news')
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
