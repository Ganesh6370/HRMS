import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AptitudeResultComponent } from './aptitude-result.component';

describe('AptitudeResultComponent', () => {
  let component: AptitudeResultComponent;
  let fixture: ComponentFixture<AptitudeResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AptitudeResultComponent]
    });
    fixture = TestBed.createComponent(AptitudeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
