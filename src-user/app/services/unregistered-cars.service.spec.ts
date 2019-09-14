import { TestBed, inject } from '@angular/core/testing';

import { UnregisteredCarsService } from './unregistered-cars.service';

describe('UnregisteredCarsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnregisteredCarsService]
    });
  });

  it('should be created', inject([UnregisteredCarsService], (service: UnregisteredCarsService) => {
    expect(service).toBeTruthy();
  }));
});
