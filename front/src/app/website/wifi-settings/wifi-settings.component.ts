import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WifiNetwork } from 'src/app/models/wifiNetwork';

@Component({
  selector: 'app-wifi-settings',
  templateUrl: './wifi-settings.component.html',
  styleUrls: ['./wifi-settings.component.css']
})
export class WifiSettingsComponent implements OnInit {

  hide: boolean;

  ssid = new FormControl(null, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(32),
  ]);

  password = new FormControl(null, [
		Validators.required,
		Validators.minLength(8),
	]);

  private wifiNetork: WifiNetwork;

  constructor() { }

  ngOnInit(): void {
    this.hide = true;
    this.wifiNetork = new WifiNetwork();
  }
  onSubmit(): void {
    this.wifiNetork.ssid = this.ssid.value;
    this.wifiNetork.password = this.password.value;
  }

}
