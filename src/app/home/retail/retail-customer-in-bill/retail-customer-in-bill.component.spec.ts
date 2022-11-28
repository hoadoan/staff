import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailCustomerInBillComponent } from './retail-customer-in-bill.component';

describe('RetailCustomerInBillComponent', () => {
  let component: RetailCustomerInBillComponent;
  let fixture: ComponentFixture<RetailCustomerInBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailCustomerInBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailCustomerInBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
