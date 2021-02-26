import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() profileName: string;
  @Input() profileImg: string;


  constructor() { }

  ngOnInit(): void {
  }

}
