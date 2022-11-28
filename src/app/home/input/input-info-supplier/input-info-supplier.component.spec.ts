import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputInfoSupplierComponent } from './input-info-supplier.component';

describe('InputInfoSupplierComponent', () => {
  let component: InputInfoSupplierComponent;
  let fixture: ComponentFixture<InputInfoSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputInfoSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputInfoSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
