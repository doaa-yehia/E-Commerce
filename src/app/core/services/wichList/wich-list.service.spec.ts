import { TestBed } from '@angular/core/testing';

import { WichListService } from './wich-list.service';

describe('WichListService', () => {
  let service: WichListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WichListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
