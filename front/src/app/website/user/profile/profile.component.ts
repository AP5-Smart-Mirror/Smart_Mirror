import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Profile;

  constructor() { }

  ngOnInit(): void {
    this.profile = new Profile(1, 'Test', null, '../../../assets/icons/pdpTest2.png');
  }

}
