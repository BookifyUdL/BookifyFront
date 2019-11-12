import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShopsComponent } from './admin-shops.component';

describe('AdminShopsComponent', () => {
  let component: AdminShopsComponent;
  let fixture: ComponentFixture<AdminShopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
