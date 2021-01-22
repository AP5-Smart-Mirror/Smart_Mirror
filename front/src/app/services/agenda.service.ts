import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Agenda } from '../models/agenda';

@Injectable({
	providedIn: 'root',
})
export class AgendaService {
	private url: string = environment.serverBaseUrl;

	constructor(private httpClient: HttpClient) {}

	getAuth(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.httpClient
				.get(this.url + '/outlook/auth')
				.toPromise()
				.then(
					(res) => {
						// Success
						resolve(res);
					},
					(msg) => {
						// Error
						reject(msg);
					}
				);
		});
	}

	getAgenda(): Promise<Agenda> {
		return new Promise<Agenda>((resolve, reject) => {
			this.httpClient
				.get<Agenda>(this.url + '/outlook/calendar')
				.toPromise()
				.then(
					(res) => {
						// Success
						resolve(res);
					},
					(msg) => {
						// Error
						reject(msg);
					}
				);
		});
	}
}
