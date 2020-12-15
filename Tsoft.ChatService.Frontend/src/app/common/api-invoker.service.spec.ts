import { TestBed } from '@angular/core/testing';

import { ApiInvokerService } from './api-invoker.service';

describe('ApiInvokerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiInvokerService = TestBed.get(ApiInvokerService);
    expect(service).toBeTruthy();
  });
});
