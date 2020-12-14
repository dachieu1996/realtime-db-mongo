/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmployeeManagerService } from './employee-manager.service';

describe('Service: EmployeeManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeManagerService]
    });
  });

  it('should ...', inject([EmployeeManagerService], (service: EmployeeManagerService) => {
    expect(service).toBeTruthy();
  }));
});
