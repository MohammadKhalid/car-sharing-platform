import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisteredCarsComponent } from './unregistered-cars.component';

describe('UnregisteredCarsComponent', () => {
  let component: UnregisteredCarsComponent;
  let fixture: ComponentFixture<UnregisteredCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnregisteredCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnregisteredCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
