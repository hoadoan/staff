import { Router } from '@angular/router';
import { UserService } from './../../../core/services/user/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-chage-password',
  templateUrl: './profile-chage-password.component.html',
  styleUrls: ['./profile-chage-password.component.css']
})
export class ProfileChagePasswordComponent implements OnInit {

  // currentPassword: string = ''
  // newPassword: string = ''
  // confirmPassword: string = ''

  chagePasswordata = this.fb.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  })
  get statusError() {
    return this.chagePasswordata.controls;
  }

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  chagePassword() {
    if (this.statusError.currentPassword.touched && this.statusError.newPassword.touched && this.statusError.confirmPassword.touched) {
      var formData: any = new FormData()
      formData.append('currentPassword', this.chagePasswordata.value.currentPassword)
      formData.append('newPassword', this.chagePasswordata.value.newPassword)
      formData.append('confirmPassword', this.chagePasswordata.value.confirmPassword)
      this.userService.changePassword(formData).subscribe((result) => {
        console.log(result);
        this.notification.create(
          'success',
          'Thành công',
          result.message
        );
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
      }, err => {
        console.log(err.error.message);
        this.notification.create(
          'error',
          'Không thành công',
          err.error.message
        );
      })
    } else {
      this.notification.create(
        'error',
        'Lỗi',
        'Vui lòng nhập thông tin để thay đổi mật khẩu'
      );
    }

  }

}
