import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailTemplateComponent } from './retail-template.component';

describe('RetailTemplateComponent', () => {
  let component: RetailTemplateComponent;
  let fixture: ComponentFixture<RetailTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
