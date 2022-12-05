import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryReceiptNoteComponent } from './history-receipt-note.component';

describe('HistoryReceiptNoteComponent', () => {
  let component: HistoryReceiptNoteComponent;
  let fixture: ComponentFixture<HistoryReceiptNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryReceiptNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryReceiptNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
