import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAchievementsComponent } from './admin-achievements.component';

describe('AdminAchievementsComponent', () => {
  let component: AdminAchievementsComponent;
  let fixture: ComponentFixture<AdminAchievementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAchievementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
