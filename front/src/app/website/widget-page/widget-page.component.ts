import { Component, OnInit } from '@angular/core';
import { WidgetName } from 'src/app/enums/widget-name';
import { Profile } from 'src/app/models/profile';
import { Widget } from 'src/app/models/widget';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Account } from '../../models/account';
import { WidgetService } from 'src/app/services/widget.service';
import { Configuration } from 'src/app/models/configuration';

@Component({
  selector: 'app-widget-page',
  templateUrl: './widget-page.component.html',
  styleUrls: ['./widget-page.component.css']
})

export class WidgetPageComponent implements OnInit {
  widgetName = WidgetName;
  currentprofile: Profile = new Profile(
    1,
    'Claire',
    [
      new Widget(1, WidgetName.agenda, new Configuration(null, 1, 1, 1, 1)),
      new Widget(2, WidgetName.almanac, new Configuration(null, 1, 1, 1, 1)),
      new Widget(3, WidgetName.digitalClock, new Configuration(null, 1, 1, 1, 1))
    ], null);

  constructor(
    private widgetService: WidgetService,
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
		private router: Router) {
	}

  ngOnInit(): void {
    //this.loadProfile(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadWidgets(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  loadProfile(id: string) {
  }

  loadWidgets(idProfile: string) {
    this.widgetService.getWidgetsById(idProfile)
    .then(profile => {
      console.log('PROFILE', profile);
    });
  }

  onSubmit(): void{
    this.currentprofile.widgets = [];
    // eslint-disable-next-line guard-for-in
    for(const widget in WidgetName){
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const checkboxValue = (<HTMLInputElement>document.getElementById(WidgetName[widget])).checked;
      if (checkboxValue ===  true){
        this.currentprofile.widgets.push(new Widget(null, WidgetName[widget], null));
      }
    }
    console.log(this.currentprofile);
    this.widgetService.setWidgetsById(this.currentprofile).then(() => {
      console.log('INSEIDE');
      this.router.navigate(['/home']);
    });
  }
}
