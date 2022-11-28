import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileChagePasswordComponent } from './profile-chage-password.component';

describe('ProfileChagePasswordComponent', () => {
  let component: ProfileChagePasswordComponent;
  let fixture: ComponentFixture<ProfileChagePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileChagePasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileChagePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
