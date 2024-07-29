import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageResumesComponent } from './manage-resumes.component';

describe('ManageResumesComponent', () => {
  let component: ManageResumesComponent;
  let fixture: ComponentFixture<ManageResumesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageResumesComponent]
    });
    fixture = TestBed.createComponent(ManageResumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
