import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-authentication',
	templateUrl: './authentication.component.html',
	styleUrls: ['./authentication.component.css'],
})

export class AuthenticationComponent implements OnInit {
	hide: boolean;

	username = new FormControl(null, [
		Validators.required,
		Validators.minLength(4),
	]);

	password = new FormControl(null, [
		Validators.required,
		Validators.minLength(8),
	]); 

	constructor() {}

	ngOnInit(): void {
		this.hide = true;
	}

	onSubmit(): void {
		alert("You're connected");
	}
}
