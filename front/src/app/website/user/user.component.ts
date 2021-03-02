/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
	loading: boolean;
	currentAccount: Account;
	profiles: Array<Profile>;

	constructor(
		private profileService: ProfileService,
		private accountService: AccountService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.currentAccount = new Account();
    this.profiles = [];
		this.loadAccount(this.activatedRoute.snapshot.paramMap.get('id'));
		this.loadProfiles(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log('PROFILES IFNALE', this.profiles);
	}

	loadAccount(id: string) {
		this.accountService.getAccount(id).then((res) => {
			console.log('ACCOUNT', res);
			this.currentAccount.username = res.username;
		});
	}

	loadProfiles(id: string) {
		this.profileService.getProfilesById(id).then((profiles) => {
			console.log('PROFILES', profiles.profiles);
			this.loading = true;
      profiles.profiles.forEach((profile) => {
        console.log('PROFILE', profile);
        this.profiles.push(profile);
      });
    }).then(() => (this.loading = false));


		/*this.profiles.push(new Profile(null, 'Gaspard', null, 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'));
    this.profiles.push(new Profile(null, 'Roger', null, 'https://images.unsplash.com/photo-1489702932289-406b7782113c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80'));
    this.profiles.push(new Profile(null, 'Florian', null, 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80'));
    this.profiles.push(new Profile(null, 'Manuelle', null, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'));
    this.profiles.push(new Profile(null, 'Invité', null, 'https://images.unsplash.com/photo-1614089119016-7a5ca1baa982?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80'));*/
	}

	choseProfile(id: number) {
		this.router.navigate(['/widget-page']);
	}

  getProfileImg(profile: Profile): string {
    return profile.img ? profile.img : 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';
  }
}
