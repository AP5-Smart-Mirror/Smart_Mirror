import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Account } from '../models/account';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
	public currentAccount: Observable<Account>;

	private url: string = environment.serverBaseUrl;
	private currentAccountSubject: BehaviorSubject<Account>;

	constructor(private httpClient: HttpClient) {
		this.currentAccountSubject = new BehaviorSubject<Account>(
			JSON.parse(localStorage.getItem('currentAccount'))
		);
		this.currentAccount = this.currentAccountSubject.asObservable();
	}

	public get currentAccountValue(): Account {
		return this.currentAccountSubject.value;
	}

	login(account: Account) {
		return new Promise<any>((resolve, reject) => {
			this.httpClient.post<Account>(this.url + '/authenticate', account)
		.toPromise()
				.then(
					(user) => {
						// store user details and jwt token in local storage to keep user logged in between page refreshes
						localStorage.setItem('currentAccount', JSON.stringify(user));
						this.currentAccountSubject.next(user);
						// Success
						resolve(user);
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
		localStorage.removeItem('currentAccount');
		this.currentAccountSubject.next(null);
	}
}
