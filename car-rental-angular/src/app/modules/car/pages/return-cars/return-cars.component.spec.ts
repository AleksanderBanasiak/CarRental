import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnCarsComponent } from './return-cars.component';

describe('ReturnCarsComponent', () => {
  let component: ReturnCarsComponent;
  let fixture: ComponentFixture<ReturnCarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReturnCarsComponent]
    });
    fixture = TestBed.createComponent(ReturnCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
