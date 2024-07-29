import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoliDayComponent } from './holi-day.component';

describe('HoliDayComponent', () => {
  let component: HoliDayComponent;
  let fixture: ComponentFixture<HoliDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoliDayComponent]
    });
    fixture = TestBed.createComponent(HoliDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
