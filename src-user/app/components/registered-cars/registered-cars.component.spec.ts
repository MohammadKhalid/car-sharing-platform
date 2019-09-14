import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredCarsComponent } from './registered-cars.component';

describe('RegisteredCarsComponent', () => {
  let component: RegisteredCarsComponent;
  let fixture: ComponentFixture<RegisteredCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
