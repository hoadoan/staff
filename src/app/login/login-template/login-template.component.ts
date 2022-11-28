import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router, Routes } from '@angular/router';
import { ACCESSTOKEN } from './../../core/utils/AppConfig';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DOMAIN } from 'src/app/core/utils/AppConfig';

@Component({
  selector: 'app-login-template',
  templateUrl: './login-template.component.html',
  styleUrls: ['./login-template.component.css']
})
export class LoginTemplateComponent implements OnInit {

  username: string = ''
  password: string = ''
  token: string = ''
  check: boolean = true

  constructor(
    private httpclient: HttpClient,
    private route: Router,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
  }

  login() {

    if (this.username == '') {
      this.check = false
    }
    if (this.password == '') {
      this.check = false
    }
    if (this.check) {
      var formData = new FormData()
      formData.append('username', this.username)
      formData.append('password', this.password)
      this.httpclient.post(DOMAIN + 'auth/user/login', formData).subscribe((result: any) => {
        if (result.accessToken) {
          // if (result.isAdmin == false) {
            this.token = `Bearer ${result.accessToken}`
            localStorage.setItem(ACCESSTOKEN, this.token)
            if (localStorage.getItem(ACCESSTOKEN)) {
              this.notification.create(
                'success',
                'Đăng nhập thành công',
                ''
              );
              this.route.navigate(['home'])
            }
          // } else {
          //   this.notification.create(
          //     'error',
          //     'Đăng nhập thất bại',
          //     'Vui lòng sử dụng tài khoản nhân viên để đăng nhập vào ứng dụng'
          //   );
          // }
        }
      }, err => {
        this.notification.create(
          'error',
          'Đăng nhập thất bại',
          'Vui lòng kiểm tra thông tin tài khoản và mật khẩu'
        );
      })
    }
  }

}
