import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url: string = environment.serverBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getProfileList(): Promise<Profile[]> {
    return new Promise<Profile[]>((resolve, reject) => {
      this.httpClient.get<Profile[]>(this.url + '/profiles')
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

  /*getProfilesByUsername(account: Account): Promise<Profile[]> {
    return new Promise<Profile[]>((resolve, reject) => {
      this.httpClient.get<Profile[]>(this.url + '/profiles/' + username, {'password': password});
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
  }*/
}
