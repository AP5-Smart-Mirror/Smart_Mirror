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

	/*getAccount(id: number): Promise<Account> {
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
	}*/

	register(account: Account): Promise<any> {
		//return this.httpClient.post<Account>(this.url + '/bdd/account/register', account);
		return Promise.resolve(1);
		/*return new Promise<any>((resolve, reject) => {
			this.httpClient
				.post<any>(this.url + '/bdd/account/register', account)
				.toPromise()
				.then(
					(response) => {
						// Success
						resolve(response);
					},
					(msg) => {
						// Error
						reject(msg);
					}
				).then((body) => {
					console.log(body);
				}).catch((err) => {
					console.log(err);
				});
		});*/
	}
}
