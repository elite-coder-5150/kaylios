import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpCheckEmailComponent } from './otp-check-email.component';

describe('OtpCheckEmailComponent', () => {
  let component: OtpCheckEmailComponent;
  let fixture: ComponentFixture<OtpCheckEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtpCheckEmailComponent]
    });
    fixture = TestBed.createComponent(OtpCheckEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
