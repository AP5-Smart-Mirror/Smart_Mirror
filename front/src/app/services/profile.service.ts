/* eslint-disable object-shorthand */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
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

  getProfilesById(idAccount: string): Promise<Array<any>> {
    return this.httpClient.post<Array<any>>(this.url + '/bdd/profile/get_profiles', {'id_account': idAccount})
        .toPromise();
  }

  getProfile(id: string): Promise<Profile> {
    return this.httpClient.post<Profile>(this.url + '/bdd/profile/get_profile', {'id': id})
        .toPromise();
  }

  getAll(): Promise<Profile[]> {
    return this.httpClient.get<Profile[]>(this.url + '/bdd/profile/get_all').toPromise();
  }

  addProfile(idAccount: string, username: string): Promise<any> {
    return this.httpClient.post<any>(this.url + '/bdd/profile/register',
    {
      'id_account': idAccount,
      'username': username
    }).toPromise();
  }
}
