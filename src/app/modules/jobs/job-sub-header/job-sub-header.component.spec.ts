import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSubHeaderComponent } from './job-sub-header.component';

describe('JobSubHeaderComponent', () => {
  let component: JobSubHeaderComponent;
  let fixture: ComponentFixture<JobSubHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobSubHeaderComponent]
    });
    fixture = TestBed.createComponent(JobSubHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
