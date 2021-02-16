import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide: boolean;

	username = new FormControl(null, [
		Validators.required,
		Validators.minLength(4),
	]);
  
  email = new FormControl(null, [
    Validators.required,
  ]);

	password = new FormControl(null, [
		Validators.required,
		Validators.minLength(8),
	]);

  confirmPassword = new FormControl(null, [
    Validators.required,
    Validators.minLength(8),
  ])


	ngOnInit(): void {
		this.hide = true;
	}

	onSubmit(): void {
		alert('You\'re registered');
	}

}



