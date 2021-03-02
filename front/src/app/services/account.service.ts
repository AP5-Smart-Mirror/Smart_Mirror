/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable quote-props */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Account } from '../models/account';
import { Profile } from '../models/profile';

@Injectable({
	providedIn: 'root',
})
export class AccountService {
	//private axios = require('axios').default;
	private url: string = environment.serverBaseUrl;

	constructor(private httpClient: HttpClient) {}

	getAccount(id: string): Promise<Account> {
		return this.httpClient
			.post<Account>(this.url + '/bdd/account/get_account', { id_account: id })
			.toPromise();
	}

	getAll(): Promise<any> {
		return this.httpClient
			.post<any>(this.url + '/bdd/account/get_all',
			{
				'username': 'Claire',
				'password': 'testtest'
			})
			.toPromise();
	}

	register(account: Account): Promise<any> {
		return this.httpClient
			.post<Account>(this.url + '/bdd/account/register', account)
			.toPromise();
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
