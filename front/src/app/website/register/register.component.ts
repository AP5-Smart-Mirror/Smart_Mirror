import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private accountService: AccountService){}

  hide: boolean;

  private account: Account;

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

	ngOnInit(): void {
		this.hide = true;
    this.account = new Account();
	}

	onSubmit(): void {
		this.account.username = this.username.value;
    this.account.password = this.password.value;
    this.accountService.register(this.account);
	}
  
}






