import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { JsonstorePersistanceService } from "./jsonstore-persistance.service";

describe("JsonstorePersistanceService", () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it("should be created", () => {
    const service: JsonstorePersistanceService = TestBed.get(
      JsonstorePersistanceService
    );
    expect(service).toBeTruthy();
  });
});
