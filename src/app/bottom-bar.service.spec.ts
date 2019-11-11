import { TestBed } from '@angular/core/testing';

import { BottomBarService } from './bottom-bar.service';

describe('BottomBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BottomBarService = TestBed.get(BottomBarService);
    expect(service).toBeTruthy();
  });
});
