import { TestBed, inject } from '@angular/core/testing';

import { ReadJsonService } from './read-json.service';

describe('ReadJsonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReadJsonService]
    });
  });

  it('should be created', inject([ReadJsonService], (service: ReadJsonService) => {
    expect(service).toBeTruthy();
  }));
});
