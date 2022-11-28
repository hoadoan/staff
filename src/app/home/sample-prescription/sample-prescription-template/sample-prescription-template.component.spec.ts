import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplePrescriptionTemplateComponent } from './sample-prescription-template.component';

describe('SamplePrescriptionTemplateComponent', () => {
  let component: SamplePrescriptionTemplateComponent;
  let fixture: ComponentFixture<SamplePrescriptionTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamplePrescriptionTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SamplePrescriptionTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
