/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable quote-props */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Widget } from '../models/widget';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  private url: string = environment.serverBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getWidgetsById(idProfile: string): Promise<Widget[]> {
    return this.httpClient.post<Widget[]>(this.url + '/bdd/widget/get_user_widgets', {'id_profile': idProfile})
        .toPromise();
  }

  setWidgetsById(profile: Profile): Promise<Widget[]> {
    return this.httpClient.post<Widget[]>(this.url + '/bdd/widget/setProfileWidgets',
    {
      'id_profile': profile.id,
      'widgets': profile.widgets
    })
        .toPromise();
  }
}
