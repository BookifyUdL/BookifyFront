import { TestBed } from '@angular/core/testing';

import { DataGenreService } from './data-genre.service';

describe('DataGenreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataGenreService = TestBed.get(DataGenreService);
    expect(service).toBeTruthy();
  });
});
