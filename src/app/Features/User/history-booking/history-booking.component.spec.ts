import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryBookingComponent } from './history-booking.component';

describe('HistoryBookingComponent', () => {
  let component: HistoryBookingComponent;
  let fixture: ComponentFixture<HistoryBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryBookingComponent]
    });
    fixture = TestBed.createComponent(HistoryBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
