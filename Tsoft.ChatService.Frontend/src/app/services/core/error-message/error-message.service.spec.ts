/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ErrorMessageService } from './error-message.service';

describe('Service: ErrorMessage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorMessageService]
    });
  });

  it('should ...', inject([ErrorMessageService], (service: ErrorMessageService) => {
    expect(service).toBeTruthy();
  }));
});
