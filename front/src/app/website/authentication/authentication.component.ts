import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
	selector: 'app-authentication',
	templateUrl: './authentication.component.html',
	styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
	hide: boolean;

	username = new FormControl(null, [
		Validators.required,
		Validators.minLength(3),
	]);

	password = new FormControl(null, [
		Validators.required,
		Validators.minLength(8),
	]);

	private account: Account;

	constructor(
		private router: Router,
		private authenticationService: AuthenticationService
	) {}

	ngOnInit(): void {
		this.hide = true;
		this.account = new Account();
	}

	onSubmit(): void {
		this.account.username = this.username.value;
		this.account.password = this.password.value;

		this.authenticationService
			.login(this.account)
			.then(body => {
				if(body && body.id > 0){
					console.log('Connection fulfilled');
					this.router.navigate(['/user']);
				} else {
					console.log('Connection failed');
					alert('Wrong password or username');
				}
			});

			/*.then((res) => {
				if(res.id){
					console.log('RES', res.id);
					this.router.navigate(['/user']);
				} else {
					alert('Try again');
				}
			});*/
	}
}
