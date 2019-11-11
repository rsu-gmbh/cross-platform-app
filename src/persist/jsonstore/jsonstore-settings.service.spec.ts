import { TestBed } from '@angular/core/testing';

import { JsonstoreSettingsService } from './jsonstore-settings.service';

describe('JsonstoreSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonstoreSettingsService = TestBed.get(JsonstoreSettingsService);
    expect(service).toBeTruthy();
  });
});
