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
    this.profiles.push(new Profile(null, 'Gaspard', null));
    this.profiles.push(new Profile(null, 'Roger', null));
    this.profiles.push(new Profile(null, 'Florian', null));
    this.profiles.push(new Profile(null, 'Manuelle', null));
    this.profiles.push(new Profile(null, 'Invité', null));
  }
}
