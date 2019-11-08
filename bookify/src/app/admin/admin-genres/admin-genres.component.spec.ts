import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGenresComponent } from './admin-genres.component';

describe('AdminGenresComponent', () => {
  let component: AdminGenresComponent;
  let fixture: ComponentFixture<AdminGenresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGenresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
