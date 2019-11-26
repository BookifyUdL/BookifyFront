import { TestBed } from '@angular/core/testing';

import { DataShopService } from './data-shop.service';

describe('DataShopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataShopService = TestBed.get(DataShopService);
    expect(service).toBeTruthy();
  });
});
