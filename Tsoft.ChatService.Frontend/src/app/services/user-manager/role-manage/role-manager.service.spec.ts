/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoleManagerService } from './role-manager.service';

describe('Service: RoleManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleManagerService]
    });
  });

  it('should ...', inject([RoleManagerService], (service: RoleManagerService) => {
    expect(service).toBeTruthy();
  }));
});
