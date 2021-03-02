import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlmanacComponent } from './almanac.component';

describe('AlmanacComponent', () => {
  let component: AlmanacComponent;
  let fixture: ComponentFixture<AlmanacComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlmanacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmanacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
