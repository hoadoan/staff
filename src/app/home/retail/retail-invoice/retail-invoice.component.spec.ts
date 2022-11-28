import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailInvoiceComponent } from './retail-invoice.component';

describe('RetailInvoiceComponent', () => {
  let component: RetailInvoiceComponent;
  let fixture: ComponentFixture<RetailInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
