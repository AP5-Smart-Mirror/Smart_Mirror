import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Widget } from '../models/widget';
import { Configuration } from '../models/configuration';

@Injectable({
	providedIn: 'root',
})
export class ConfigurationService {
	private url: string = environment.server_base_url;

	constructor(private httpClient: HttpClient) {}

	getConfiguration(id_widget: number): Promise<Configuration> {
		return new Promise<Configuration>((resolve, reject) => {
			this.httpClient
				.get<Configuration>(this.url + '/configuration/' + id_widget)
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
