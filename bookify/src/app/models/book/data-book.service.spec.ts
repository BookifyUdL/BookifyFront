import { TestBed } from '@angular/core/testing';

import { DataBookService } from './data-book.service';

describe('DataBookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataBookService = TestBed.get(DataBookService);
    expect(service).toBeTruthy();
  });
});
