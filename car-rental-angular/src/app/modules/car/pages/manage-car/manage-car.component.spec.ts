import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCarComponent } from './manage-car.component';

describe('ManageCarComponent', () => {
  let component: ManageCarComponent;
  let fixture: ComponentFixture<ManageCarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCarComponent]
    });
    fixture = TestBed.createComponent(ManageCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
