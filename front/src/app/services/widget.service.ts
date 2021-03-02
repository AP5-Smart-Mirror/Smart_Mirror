import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Widget } from '../models/widget';

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
}
