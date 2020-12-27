/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChatHubService } from './chat-hub.service';

describe('Service: ChatHub', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatHubService]
    });
  });

  it('should ...', inject([ChatHubService], (service: ChatHubService) => {
    expect(service).toBeTruthy();
  }));
});
