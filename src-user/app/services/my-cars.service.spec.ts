import { TestBed, inject } from '@angular/core/testing';

import { MyCarsService } from './my-cars.service';

describe('MyCarsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyCarsService]
    });
  });

  it('should be created', inject([MyCarsService], (service: MyCarsService) => {
    expect(service).toBeTruthy();
  }));
});
