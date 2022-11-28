import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailCustomerHistoryInvoiceComponent } from './retail-customer-history-invoice.component';

describe('RetailCustomerHistoryInvoiceComponent', () => {
  let component: RetailCustomerHistoryInvoiceComponent;
  let fixture: ComponentFixture<RetailCustomerHistoryInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailCustomerHistoryInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailCustomerHistoryInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
