import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTimingComponent } from './schedule-timing.component';

describe('ScheduleTimingComponent', () => {
  let component: ScheduleTimingComponent;
  let fixture: ComponentFixture<ScheduleTimingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleTimingComponent]
    });
    fixture = TestBed.createComponent(ScheduleTimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
