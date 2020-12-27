/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddressManagerService } from './address-manager.service';

describe('Service: AddressManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddressManagerService]
    });
  });

  it('should ...', inject([AddressManagerService], (service: AddressManagerService) => {
    expect(service).toBeTruthy();
  }));
});
