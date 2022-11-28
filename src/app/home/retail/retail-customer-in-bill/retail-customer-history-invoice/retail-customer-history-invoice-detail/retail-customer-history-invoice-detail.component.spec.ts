import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailCustomerHistoryInvoiceDetailComponent } from './retail-customer-history-invoice-detail.component';

describe('RetailCustomerHistoryInvoiceDetailComponent', () => {
  let component: RetailCustomerHistoryInvoiceDetailComponent;
  let fixture: ComponentFixture<RetailCustomerHistoryInvoiceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailCustomerHistoryInvoiceDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailCustomerHistoryInvoiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
