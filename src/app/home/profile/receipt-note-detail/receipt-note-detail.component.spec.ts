import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptNoteDetailComponent } from './receipt-note-detail.component';

describe('ReceiptNoteDetailComponent', () => {
  let component: ReceiptNoteDetailComponent;
  let fixture: ComponentFixture<ReceiptNoteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptNoteDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptNoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
