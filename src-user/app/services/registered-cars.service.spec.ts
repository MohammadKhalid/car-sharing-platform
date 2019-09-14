import { TestBed, inject } from '@angular/core/testing';

import { RegisteredCarsService } from './registered-cars.service';

describe('RegisteredCarsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisteredCarsService]
    });
  });

  it('should be created', inject([RegisteredCarsService], (service: RegisteredCarsService) => {
    expect(service).toBeTruthy();
  }));
});
