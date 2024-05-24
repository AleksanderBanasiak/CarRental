import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentedCarListComponent } from './rented-car-list.component';

describe('RentedCarListComponent', () => {
  let component: RentedCarListComponent;
  let fixture: ComponentFixture<RentedCarListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentedCarListComponent]
    });
    fixture = TestBed.createComponent(RentedCarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
