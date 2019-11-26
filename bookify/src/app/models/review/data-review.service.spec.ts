import { TestBed } from '@angular/core/testing';

import { DataReviewService } from './data-review.service';

describe('DataReviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataReviewService = TestBed.get(DataReviewService);
    expect(service).toBeTruthy();
  });
});
