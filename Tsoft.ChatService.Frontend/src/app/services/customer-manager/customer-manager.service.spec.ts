/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomerManagerService } from './customer-manager.service';

describe('Service: CustomerManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerManagerService]
    });
  });

  it('should ...', inject([CustomerManagerService], (service: CustomerManagerService) => {
    expect(service).toBeTruthy();
  }));
});
