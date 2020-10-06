import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url: string = environment.server_base_url;

  constructor(private httpClient: HttpClient) { }

  getProfileList(): Promise<Profile[]> {
    return new Promise<Profile[]>((resolve, reject) => {
      this.httpClient.get<Profile[]>(this.url + '/profile')
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

  getProfileById(id: number): Promise<Profile> {
    return new Promise<Profile>((resolve, reject) => {
      this.httpClient.get<Profile>(this.url + '/profile/' + id)
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
