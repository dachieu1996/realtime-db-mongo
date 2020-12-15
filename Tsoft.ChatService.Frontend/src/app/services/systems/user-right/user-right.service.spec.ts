import { TestBed } from '@angular/core/testing';

import { UserRightService } from './user-right.service';

describe('UserRightService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserRightService = TestBed.get(UserRightService);
    expect(service).toBeTruthy();
  });
});
