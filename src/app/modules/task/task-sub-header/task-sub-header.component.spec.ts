import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSubHeaderComponent } from './task-sub-header.component';

describe('TaskSubHeaderComponent', () => {
  let component: TaskSubHeaderComponent;
  let fixture: ComponentFixture<TaskSubHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskSubHeaderComponent]
    });
    fixture = TestBed.createComponent(TaskSubHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
