import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBrokenProductComponent } from './report-broken-product.component';

describe('ReportBrokenProductComponent', () => {
  let component: ReportBrokenProductComponent;
  let fixture: ComponentFixture<ReportBrokenProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportBrokenProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportBrokenProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
