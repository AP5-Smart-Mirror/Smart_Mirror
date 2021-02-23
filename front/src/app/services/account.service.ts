import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private url: string = environment.serverBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getAccount(username: string): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
      this.httpClient.get<Account>(this.url + '/account/' + username)
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
