/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserManagerService } from './user-manager.service';

describe('Service: UserManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserManagerService]
    });
  });

  it('should ...', inject([UserManagerService], (service: UserManagerService) => {
    expect(service).toBeTruthy();
  }));
});
