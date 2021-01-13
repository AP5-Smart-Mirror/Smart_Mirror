import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WeatherCurrentComponent } from './weather-current.component';

describe('WeatherComponent', () => {
	let component: WeatherCurrentComponent;
	let fixture: ComponentFixture<WeatherCurrentComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [WeatherCurrentComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(WeatherCurrentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
