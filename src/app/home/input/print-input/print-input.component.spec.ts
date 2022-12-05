import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintInputComponent } from './print-input.component';

describe('PrintInputComponent', () => {
  let component: PrintInputComponent;
  let fixture: ComponentFixture<PrintInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
