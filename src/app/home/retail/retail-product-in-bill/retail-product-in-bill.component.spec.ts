import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailProductInBillComponent } from './retail-product-in-bill.component';

describe('RetailProductInBillComponent', () => {
  let component: RetailProductInBillComponent;
  let fixture: ComponentFixture<RetailProductInBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailProductInBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailProductInBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
