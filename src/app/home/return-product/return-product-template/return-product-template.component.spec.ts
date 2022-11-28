import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnProductTemplateComponent } from './return-product-template.component';

describe('ReturnProductTemplateComponent', () => {
  let component: ReturnProductTemplateComponent;
  let fixture: ComponentFixture<ReturnProductTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnProductTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnProductTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
