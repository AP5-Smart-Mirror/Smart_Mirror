import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Account } from '../models/account';

@Injectable({
	providedIn: 'root',
})
export class AccountService {
	private url: string = environment.serverBaseUrl;

	constructor(private httpClient: HttpClient) {}

	getAccount(id: number): Promise<Account> {
		return new Promise<Account>((resolve, reject) => {
			this.httpClient
				.get<Account>(this.url + '/account/' + id)
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

	getAll(): Promise<Account[]> {
		return new Promise<Account[]>((resolve, reject) => {
			this.httpClient
				.get<Account[]>(this.url + '/accounts')
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

	register(account: Account) {
		return new Promise<any>((resolve, reject) => {
			this.httpClient
				.post<Account>(this.url + '/register', account)
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