import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide: boolean;

  username = new FormControl(null, [
		Validators.required,
		Validators.minLength(3),
	]);

  email = new FormControl(null, [
    Validators.required,
    Validators.email,
  ]);

	password = new FormControl(null, [
		Validators.required,
		Validators.minLength(8),
	]);

  private account: Account;

  constructor(private accountService: AccountService, private router: Router){}

	ngOnInit(): void {
		this.hide = true;
    this.account = new Account();
	}

	onSubmit(): void {
		this.account.username = this.username.value;
    this.account.password = this.password.value;
    this.accountService.register(this.account)
      .then(() => {
        console.log('REGISTER SUCCESSFUL');
        this.router.navigate(['/login']);
      });
	}
}
