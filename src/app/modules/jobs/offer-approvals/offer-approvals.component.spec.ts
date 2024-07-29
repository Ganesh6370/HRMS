import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferApprovalsComponent } from './offer-approvals.component';

describe('OfferApprovalsComponent', () => {
  let component: OfferApprovalsComponent;
  let fixture: ComponentFixture<OfferApprovalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferApprovalsComponent]
    });
    fixture = TestBed.createComponent(OfferApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
