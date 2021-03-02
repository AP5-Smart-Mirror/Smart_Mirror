import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WifiNetwork } from '../models/wifiNetwork';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class WifiSettingsService {
	public currentWifiNetwork: Observable<WifiNetwork>;

	private url: string = environment.serverBaseUrl;
	private currentWifiNetworkSubject: BehaviorSubject<WifiNetwork>;

	constructor(private httpClient: HttpClient) {
		this.currentWifiNetworkSubject = new BehaviorSubject<WifiNetwork>(
			JSON.parse(localStorage.getItem('currentWifiNetwork'))
		);
		this.currentWifiNetwork = this.currentWifiNetworkSubject.asObservable();
	}

	public get currentWifiNetworkValue(): WifiNetwork {
		return this.currentWifiNetworkSubject.value;
	}

	login(wifiNetwork: WifiNetwork) {
		return new Promise<any>((resolve, reject) => {
			this.httpClient.post<WifiNetwork>(this.url + '/authenticate', wifiNetwork)
		.toPromise()
				.then(
					(ssid) => {
						// store ssid details and jwt token in local storage to keep ssid logged in between page refreshes
						localStorage.setItem('currentWifiNetwork', JSON.stringify(ssid));
						this.currentWifiNetworkSubject.next(ssid);
						// Success
						resolve(ssid);
					},
					(msg) => {
						// Error
						reject(msg);
					}
				);
		});
	}

	logout() {
		// remove user from local storage and set current user to null
		localStorage.removeItem('currentWifiNetwork');
		this.currentWifiNetworkSubject.next(null);
	}
}
