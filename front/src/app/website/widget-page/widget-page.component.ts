import { Component, OnInit } from '@angular/core';
import { WidgetName } from 'src/app/enums/widget-name';
import { Profile } from 'src/app/models/profile';
import { Widget } from 'src/app/models/widget';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { WidgetService } from 'src/app/services/widget.service';

@Component({
  selector: 'app-widget-page',
  templateUrl: './widget-page.component.html',
  styleUrls: ['./widget-page.component.css']
})

export class WidgetPageComponent implements OnInit {
  widgetName = WidgetName;
  currentprofile: Profile;

  constructor(
    private widgetService: WidgetService,
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
		private router: Router) {
	}

  ngOnInit(): void {
    this.loadProfile(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadWidgets(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  loadProfile(id: string) {
    this.profileService.getProfile(id)
    .then(profile => {
      this.currentprofile = profile;
    });
  }

  loadWidgets(idProfile: string) {
    this.currentprofile.widgets = [];

    this.widgetService.getWidgetsById(idProfile)
    .then(widgets => {
      widgets.widgets.forEach(widget => {
        this.currentprofile.widgets.push(widget);
      });
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
      this.router.navigate(['/home']);
    });
  }
}
