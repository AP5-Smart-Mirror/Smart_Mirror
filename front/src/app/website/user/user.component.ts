/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Account } from '../../models/account';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  loading: boolean;
	currentAccount: Account;
  profiles: Array<Profile>;

	constructor(private authenticationService: AuthenticationService,
    private profileService: ProfileService) {
		this.currentAccount = this.authenticationService.currentAccountValue;
	}

	ngOnInit(): void {
    if(this.currentAccount) {
      console.log(this.currentAccount);
    } else {
      this.currentAccount = new Account();
      this.currentAccount.username = 'UNKNOWN';
      console.log(this.currentAccount);
    }
    this.profiles = new Array();
    this.loadProfiles();
  }

  loadProfiles() {
    /*this.profileService.getProfilesById(this.currentAccount.id)
    .then((profiles) => {
      this.loading = true;
      profiles.forEach((profile) => {
        this.profiles.push(profile);
      });
    })
    .then(() => (this.loading = false));*/
    this.profiles.push(new Profile(null, 'Gaspard', null, 'https://images.unsplash.com/photo-1612831454862-00d2c27dabbc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1525&q=80'));
    this.profiles.push(new Profile(null, 'Roger', null, 'https://images.unsplash.com/photo-1612831454862-00d2c27dabbc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1525&q=80'));
    this.profiles.push(new Profile(null, 'Florian', null, 'https://images.unsplash.com/photo-1612831454862-00d2c27dabbc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1525&q=80'));
    this.profiles.push(new Profile(null, 'Manuelle', null, 'https://images.unsplash.com/photo-1612831454862-00d2c27dabbc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1525&q=80'));
    this.profiles.push(new Profile(null, 'Invité', null, 'https://images.unsplash.com/photo-1612831454862-00d2c27dabbc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1525&q=80'));
  }
}
