/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PermissionCanactivateService } from './permission-canactivate.service';

describe('Service: PermissionCanactivate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermissionCanactivateService]
    });
  });

  it('should ...', inject([PermissionCanactivateService], (service: PermissionCanactivateService) => {
    expect(service).toBeTruthy();
  }));
});
