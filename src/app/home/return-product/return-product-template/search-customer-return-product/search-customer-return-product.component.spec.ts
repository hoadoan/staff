import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCustomerReturnProductComponent } from './search-customer-return-product.component';

describe('SearchCustomerReturnProductComponent', () => {
  let component: SearchCustomerReturnProductComponent;
  let fixture: ComponentFixture<SearchCustomerReturnProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCustomerReturnProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCustomerReturnProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
