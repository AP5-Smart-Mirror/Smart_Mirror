import { HostListener, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Profile } from '../models/profile';
import { Widget } from '../models/widget';
import { WidgetName } from '../enums/widget-name';
import { ProfileService } from '../services/profile.service';
import { AccountService } from '../services/account.service';
import { Configuration } from '../models/configuration';

@Component({
	selector: 'app-mirror',
	templateUrl: './mirror.component.html',
	styleUrls: ['./mirror.component.css'],
})
export class MirrorComponent implements OnInit {
	profiles: Array<Profile> = [];
	currentProfile: Profile;
	widgets: Array<Widget>;
	widgetName = WidgetName;
	htmlAnimated: HTMLElement;

	constructor(
		private profileService: ProfileService,
		private accountService: AccountService
	) {}

	@HostListener('document:keyup', ['$event'])
	/*When ArrowUp key is pressed, we browse the next profile.
  If we reach the end of the list, we display default profile again
  Loop*/
	onKeyUp(eventData: KeyboardEvent): void {
		if (eventData.key === 'ArrowUp') {
			const idxCurrentProfile = this.profiles.indexOf(this.currentProfile);
			// If we don't reach the end of the list
			if (idxCurrentProfile + 1 < this.profiles.length) {
				this.currentProfile = this.profiles[idxCurrentProfile + 1];
				// Go back to default profile
			} else {
				this.currentProfile = this.profiles[0];
			}
			this.playAnimation();
		}
	}

	ngOnInit(): void {
		this.init();
		this.currentProfile = this.profiles[0];
		console.log('THIS PROFILES', this.profiles);
		this.playAnimation();
	}

	init(): void {
		this.accountService.getAll().then((profiles) => {
			console.log('ALL PROFILES', profiles.profiles);
			profiles.profiles.forEach((profile) => {
				const widgetsTo = this.addConfigurationWidget(profile.widgets);
				console.log('WIDGET METHOD', widgetsTo);
				this.profiles.push(
					new Profile(profile.id, profile.username, widgetsTo, null)
				);
			});
		});
	}

	addConfigurationWidget(widget: Widget[]): Widget[] {
		const result: Widget[] = [];
		console.log('WIDGET', widget);
		widget.forEach(w => {
			switch (w.widget) {
				case WidgetName.agenda:
					result.push(new Widget(null, WidgetName.agenda, new Configuration(null, 9, 11, 4, 7)));
					break;
				case WidgetName.almanac:
					result.push(new Widget(null, WidgetName.almanac, new Configuration(null, 1, 3, 2, 3)));
					break;
				case WidgetName.analogClock:
					result.push(new Widget(null, WidgetName.analogClock, new Configuration(null, 8, 9, 1, 2)));
					break;
				case WidgetName.digitalClock:
					result.push(new Widget(null, WidgetName.digitalClock, new Configuration(null, 10, 11, 1, 2)));
					break;
				case WidgetName.date:
					result.push(new Widget(null, WidgetName.date, new Configuration(null, 3, 8, 1, 2)));
					break;
				case WidgetName.weatherCurrent:
					result.push(new Widget(null, WidgetName.weatherCurrent, new Configuration(null, 1, 3, 1, 2)));
					break;
				case WidgetName.news:
					result.push(new Widget(null, WidgetName.news, new Configuration(null, 1, 11, 6, 7)));
					break;
				case WidgetName.weatherForecast:
					result.push(new Widget(null, WidgetName.weatherForecast, new Configuration(null, 1, 3, 4, 6)));
					break;
				case WidgetName.weatherWeekend:
					result.push(new Widget(null, WidgetName.weatherWeekend, new Configuration(null, 9, 11, 1, 3)));
					break;
				case WidgetName.mail:
					result.push(new Widget(null, WidgetName.mail, new Configuration(null, 9, 11, 4, 7)));
					break;
				default:
					console.log('WIDGET NOT FOUND');
					break;
			}
		});
		return result;
	}

	searchWidget(widget: Array<Widget>, name: WidgetName): boolean {
		return widget.findIndex((n) => n.widget === name) !== -1 ? true : false;
	}

	setPositionWidget(name: WidgetName): any {
		const conf = this.currentProfile.widgets.find((n) => n.widget === name)
			.config;
		return {
			'grid-column-start': conf.posXStart,
			'grid-column-end': conf.posXEnd,
			'grid-row-start': conf.posYStart,
			'grid-row-end': conf.posYEnd,
		};
	}

	playAnimation(): void {
		document.getElementById('animated').animate(
			[
				{
					// from
					opacity: 0,
					fontSize: 'x-large',
				},
				{
					// to
					opacity: 1,
					fontSize: 'xx-large',
				},
			],
			1500
		);
	}
}
