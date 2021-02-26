import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { WidgetName } from 'src/app/enums/widget-name';
import { Profile } from 'src/app/models/profile';
import { Widget } from 'src/app/models/widget';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Account } from '../../models/account';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-widget-page',
  templateUrl: './widget-page.component.html',
  styleUrls: ['./widget-page.component.css']
})

export class WidgetPageComponent implements OnInit {
  widgetName = WidgetName;
  profile: Profile;
  currentAccount: Account;

  constructor(private authenticationService: AuthenticationService,
    private profileService: ProfileService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
		this.currentAccount = this.authenticationService.currentAccountValue;
	}

  ngOnInit(): void {
    this.profile = new Profile(null, null, [new Widget(null, WidgetName.date, null), new Widget(null, WidgetName.almanac, null)], null);
  }

  onSubmit(): void{
    this.profile.widgets = [];
    // eslint-disable-next-line guard-for-in
    for(const widget in WidgetName){
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const checkboxValue = (<HTMLInputElement>document.getElementById(WidgetName[widget])).checked;
      if (checkboxValue ===  true){
        this.profile.widgets.push(new Widget(null, WidgetName[widget], null));
      }
    }
    console.log(this.profile);
    this.router.navigate(['/user']);
  }
}
