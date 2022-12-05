import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchTagInfomationComponent } from './batch-tag-infomation.component';

describe('BatchTagInfomationComponent', () => {
  let component: BatchTagInfomationComponent;
  let fixture: ComponentFixture<BatchTagInfomationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchTagInfomationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchTagInfomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
