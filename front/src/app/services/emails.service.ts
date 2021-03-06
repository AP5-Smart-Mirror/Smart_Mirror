import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Emails } from '../models/emails';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {
  private url: string = environment.serverBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getMail(): Promise<Emails[]> {
    return this.httpClient.get<Emails[]>(this.url + '/google/mails')
        .toPromise();
  }
}
