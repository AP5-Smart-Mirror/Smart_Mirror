/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Account } from '../../models/account';
import { Router } from '@angular/router';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  loading: boolean;
	currentAccount: Account;
  profiles: Array<Profile>;

	constructor(private router: Router) {
    //this.currentAccount = this.activatedRoute.queryParams.subscribe(params =>params.get('account'));
		//this.currentAccount = this.authenticationService.currentAccountValue;
	}

	ngOnInit(): void {
    console.log(this.currentAccount);
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
    this.profiles.push(new Profile(null, 'Gaspard', null, 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'));
    this.profiles.push(new Profile(null, 'Roger', null, 'https://images.unsplash.com/photo-1489702932289-406b7782113c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80'));
    this.profiles.push(new Profile(null, 'Florian', null, 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80'));
    this.profiles.push(new Profile(null, 'Manuelle', null, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'));
    this.profiles.push(new Profile(null, 'Invité', null, 'https://images.unsplash.com/photo-1614089119016-7a5ca1baa982?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80'));
  }

  choseProfile(id: number) {
    this.router.navigate(['/widget-page']);
  }
}
