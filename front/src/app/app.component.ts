import { HostListener, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Profile } from './models/profile';
import { Widget } from './models/widget';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  profiles: Array<Profile>;
  currentProfile: Profile;
  widgets: Array<Widget>;

  constructor(){ }

  ngOnInit(): void {
    this.init();
    this.widgets.push(new Widget(1, 'weather', null));
    this.profiles.push(new Profile(null, 'default', null));
    this.profiles.push(new Profile(1, "Claire", this.widgets));
    this.profiles.push(new Profile(2, "Stefan", this.widgets));
    this.currentProfile = this.profiles[0];
  }

  init(): void {
    this.profiles = new Array<Profile>();
    this.widgets = new Array<Widget>();
    // Value by default to test behaviour
    this.widgets.push(new Widget(1, 'weather', null));
    this.profiles.push(new Profile(null, 'default', null));
    this.profiles.push(new Profile(1, "Claire", this.widgets));
    this.profiles.push(new Profile(2, "Stefan", this.widgets));
    this.currentProfile = this.profiles[0];
  }

  @HostListener('document:keyup', ['$event'])
  /*When ArrowUp key is pressed, we browse the profile array til the next profile.
  If we reach the end of the list, we display default profile*/
  public onKeyUp(eventData: KeyboardEvent) {
    console.log('eventData.key', eventData.key);
    if(eventData.key === 'ArrowUp'){
      const idxCurrentProfile = this.profiles.indexOf(this.currentProfile);
      console.log('idxCurrentProfile', idxCurrentProfile);
      // If we reach the end of the list
      if(idxCurrentProfile + 1 < this.profiles.length){
        console.log('idxCurrentProfile in if', idxCurrentProfile);
        this.currentProfile = this.profiles[idxCurrentProfile+1];
        // Go back to default profile
      } else {
        this.currentProfile = this.profiles[0];
        console.log('return 0');
      }
    }
  }
}
