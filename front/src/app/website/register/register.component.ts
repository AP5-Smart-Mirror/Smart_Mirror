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

  constructor(private accountService: AccountService, private router: Router){}

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
    this.accountService.register(this.account)
      .then((res) => {
        console.log(res);
        this.router.navigate(['/home']);
      })
      .then((error) => {
        console.log(error);
        this.password.setValue('');
        this.username.setValue('');
        alert("Nom d'utilisateur déjà utilisé")
      })
	}
  
}






