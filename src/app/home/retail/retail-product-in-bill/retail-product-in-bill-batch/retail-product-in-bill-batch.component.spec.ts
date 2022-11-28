import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailProductInBillBatchComponent } from './retail-product-in-bill-batch.component';

describe('RetailProductInBillBatchComponent', () => {
  let component: RetailProductInBillBatchComponent;
  let fixture: ComponentFixture<RetailProductInBillBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailProductInBillBatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailProductInBillBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
