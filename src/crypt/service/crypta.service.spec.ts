import { TestBed } from '@angular/core/testing';

import { CryptaService } from './crypta.service';

describe('CryptaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CryptaService = TestBed.get(CryptaService);
    expect(service).toBeTruthy();
  });
});
