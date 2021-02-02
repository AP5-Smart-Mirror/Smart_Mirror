import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-authentication',
	templateUrl: './authentication.component.html',
	styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
	username: FormControl = new FormControl(null, [
		Validators.required,
		Validators.minLength(4),
	]);

	password: FormControl = new FormControl(null, [
		Validators.required,
		Validators.minLength(8),
	]);

	constructor() {}

	ngOnInit(): void {}
}
