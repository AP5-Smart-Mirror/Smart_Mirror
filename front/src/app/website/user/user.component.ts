/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';
import { FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
	loading: boolean;
	currentAccount: Account;
	profiles: Array<Profile>;

	name = new FormControl(null, [Validators.required, Validators.minLength(3)]);

	constructor(
		private profileService: ProfileService,
		private accountService: AccountService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.init();
	}

	init() {
		this.currentAccount = new Account();
		this.currentAccount.id = Number(
			this.activatedRoute.snapshot.paramMap.get('id')
		);
		this.loadAccount(this.activatedRoute.snapshot.paramMap.get('id'));
		this.loadProfiles(this.activatedRoute.snapshot.paramMap.get('id'));
	}

	loadAccount(id: string) {
		this.accountService.getAccount(id).then((res) => {
			this.currentAccount.username = res.username;
		});
	}

	loadProfiles(id: string) {
		this.profiles = [];
		this.profileService.getProfilesById(id).then((profiles) => {
			profiles.profiles.forEach((profile) => {
				this.profiles.push(profile);
			});
		});
	}

	choseProfile(id: number) {
		this.router.navigate(['/widget-page', id]);
	}

	getProfileImg(profile: Profile): string {
		return profile.img
			? profile.img
			: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';
	}

	addNewProfile(): void {
		if (this.profiles.length >= 5) {
			console.log('Maximum of profiles reached');
			this.name.setValue('');
		} else if (this.name.valid) {
			this.profileService.addProfile(
				String(this.currentAccount.id),
				this.name.value
			);
			this.name.setValue('');
			console.log('New profile added correctly');
			this.init();
		}
	}
}
