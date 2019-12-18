import { TestBed } from '@angular/core/testing';

import { DataStatisticsService } from './data-statistics.service';

describe('DataStatisticsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataStatisticsService = TestBed.get(DataStatisticsService);
    expect(service).toBeTruthy();
  });
});
