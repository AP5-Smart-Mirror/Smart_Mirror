import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnalogClockComponent } from './analog-clock.component';

describe('AnalogClockComponent', () => {
  let component: AnalogClockComponent;
  let fixture: ComponentFixture<AnalogClockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalogClockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalogClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
