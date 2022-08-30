import { TestBed } from '@angular/core/testing';

import { CooperDbService } from './cooper-db.service';

describe('CooperDbService', () => {
  let service: CooperDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CooperDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
