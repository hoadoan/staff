import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnProductDetailComponent } from './return-product-detail.component';

describe('ReturnProductDetailComponent', () => {
  let component: ReturnProductDetailComponent;
  let fixture: ComponentFixture<ReturnProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnProductDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
