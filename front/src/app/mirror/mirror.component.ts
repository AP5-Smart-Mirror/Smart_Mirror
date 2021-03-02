import { HostListener, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Configuration } from '../models/configuration';
import { Profile } from '../models/profile';
import { Widget } from '../models/widget';
import { WidgetName } from '../enums/widget-name';
import { WidgetService } from '../services/widget.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-mirror',
  templateUrl: './mirror.component.html',
  styleUrls: ['./mirror.component.css']
})

export class MirrorComponent implements OnInit {
	profiles: Array<Profile>;
	currentProfile: Profile;
	widgets: Array<Widget>;
	widgetName = WidgetName;

	htmlAnimated: HTMLElement;

	constructor(
		private profileService: ProfileService,
		private widgetService: WidgetService) {}

	@HostListener('document:keyup', ['$event'])
	/*When ArrowUp key is pressed, we browse the next profile.
  If we reach the end of the list, we display default profile again
  Loop*/
	public onKeyUp(eventData: KeyboardEvent): void {
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
		this.profiles = new Array<Profile>();
		this.init();
		this.currentProfile = this.profiles[0];
		this.playAnimation();
	}

	init(): void {
		/*this.profiles.push(
			new Profile(
				null,
				'default',
				new Array<Widget>(
					new Widget(
						1,
						WidgetName.weatherForecast,
						new Configuration(null, 1, 3, 4, 6)
					),
					new Widget(2, WidgetName.date, new Configuration(null, 3, 8, 1, 2)),
					new Widget(
						3,
						WidgetName.analogClock,
						new Configuration(null, 8, 9, 1, 2)
					),
					new Widget(4, WidgetName.news, new Configuration(null, 2, 10, 6, 7))
				),
				null
			)
		);
		this.profiles.push(
			new Profile(
				1,
				'Claire',
				new Array<Widget>(
					new Widget(
						1,
						WidgetName.weatherForecast,
						new Configuration(null, 1, 3, 1, 4)
					),
					new Widget(2, WidgetName.date, new Configuration(null, 3, 8, 1, 2)),
					new Widget(
						3,
						WidgetName.analogClock,
						new Configuration(null, 8, 9, 1, 2)
					),
					new Widget(4, WidgetName.agenda, new Configuration(null, 9, 11, 4, 7)),
					new Widget(5, WidgetName.news, new Configuration(null, 1, 11, 6, 7)),
					new Widget(
						6,
						WidgetName.weatherWeekend,
						new Configuration(null, 9, 11, 1, 3)
					)
				),
				null
			)
		);
		this.profiles.push(
			new Profile(
				2,
				'Stephan',
				new Array<Widget>(
					new Widget(
						1,
						WidgetName.weatherCurrent,
						new Configuration(null, 1, 3, 1, 2)
					),
					new Widget(2, WidgetName.date, new Configuration(null, 4, 7, 1, 2)),
					new Widget(
						4,
						WidgetName.digitalClock,
						new Configuration(null, 10, 11, 1, 2)
					),
					new Widget(5, WidgetName.news, new Configuration(null, 3, 9, 6, 7)),
					new Widget(6, WidgetName.almanac, new Configuration(null, 1, 3, 2, 3))
				),
				null
			)
		);*/
		this.profileService.getAll()
		.then(profiles => {
			console.log('ALL PROFILES', profiles);
			profiles.forEach(profile => {
				//this.profiles.push(new Profile());
			});
		});
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
