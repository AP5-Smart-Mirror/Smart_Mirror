import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Account } from '../models/account';

@Injectable({
	providedIn: 'root',
})
export class AccountService {
	//private axios = require('axios').default;
	private url: string = environment.serverBaseUrl;

	constructor(private httpClient: HttpClient) {}

	getAccount(id: string): Promise<Account> {
		return this.httpClient.post<Account>(this.url + '/bdd/account/get_account', {'id_account': id}).toPromise();
	}

	/*getAll(): Promise<Account[]> {
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
		return this.httpClient.post<Account>(this.url + '/bdd/account/register', account).toPromise();
		//return Promise.resolve(1);
		/*return this.axios.post(this.url + '/bdd/account/register', {account})
		  .then((response: any) => {
			console.log(response);
		  })
		  .catch((error: any) => {
			console.log(error);
		  });*/
	}
}
