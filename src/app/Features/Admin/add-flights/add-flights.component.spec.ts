import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlightsComponent } from './add-flights.component';

describe('AddFlightsComponent', () => {
  let component: AddFlightsComponent;
  let fixture: ComponentFixture<AddFlightsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFlightsComponent]
    });
    fixture = TestBed.createComponent(AddFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
