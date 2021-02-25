import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherWeekendComponent } from './weather-weekend.component';

describe('WeatherWeekendComponent', () => {
  let component: WeatherWeekendComponent;
  let fixture: ComponentFixture<WeatherWeekendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherWeekendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherWeekendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
