import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Account } from '../models/account';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
	public currentUser: Observable<Account>;

	private url: string = environment.serverBaseUrl;
	private currentUserSubject: BehaviorSubject<Account>;

	constructor(private httpClient: HttpClient) {
		this.currentUserSubject = new BehaviorSubject<Account>(
			JSON.parse(localStorage.getItem('currentUser'))
		);
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue(): Account {
		return this.currentUserSubject.value;
	}

	login(account: Account) {
		return new Promise<any>((resolve, reject) => {
			this.httpClient.post<Account>(this.url + '/authenticate', account)
		.toPromise()
				.then(
					(user) => {
						// store user details and jwt token in local storage to keep user logged in between page refreshes
						localStorage.setItem('currentUser', JSON.stringify(user));
						this.currentUserSubject.next(user);
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
		localStorage.removeItem('currentUser');
		this.currentUserSubject.next(null);
	}
}
