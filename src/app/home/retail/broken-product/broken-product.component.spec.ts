import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokenProductComponent } from './broken-product.component';

describe('BrokenProductComponent', () => {
  let component: BrokenProductComponent;
  let fixture: ComponentFixture<BrokenProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokenProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrokenProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
