import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCarsComponent } from './my-cars.component';

describe('MyCarsComponent', () => {
  let component: MyCarsComponent;
  let fixture: ComponentFixture<MyCarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCarsComponent]
    });
    fixture = TestBed.createComponent(MyCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
