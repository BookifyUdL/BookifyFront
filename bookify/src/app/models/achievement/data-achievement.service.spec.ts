import { TestBed } from '@angular/core/testing';

import { DataAchievementService } from './data-achievement.service';

describe('DataAchievementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataAchievementService = TestBed.get(DataAchievementService);
    expect(service).toBeTruthy();
  });
});
