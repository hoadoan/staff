import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from './../../../core/services/user/user.service';
import { PROFILE } from './../../../core/utils/AppConfig';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-template',
  templateUrl: './profile-template.component.html',
  styleUrls: ['./profile-template.component.css']
})
export class ProfileTemplateComponent implements OnInit {

  profile: any
  tempProfile: any = localStorage.getItem(PROFILE)
  emailAddressRecovery: string = ''
  phoneNumber: string = ''
  id: number = 1
  constructor(
    private userService: UserService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.profile = JSON.parse(this.tempProfile)
    this.userService.getProfile().subscribe((result) => {
      console.log(result);
      this.profile = result.data
      this.phoneNumber = this.profile.phoneNumber
      this.emailAddressRecovery = this.profile.email
      this.id = this.profile.userId
      console.log(this.id)
    })
  }


  updateProfile() {

    var formData = new FormData()

    if (this.phoneNumber != this.profile.phoneNumber || this.emailAddressRecovery != this.profile.email) {
      if (this.phoneNumber == null) {
        this.phoneNumber = ''
      } else if (this.emailAddressRecovery == null) {
        this.emailAddressRecovery = ''
      }
      formData.append('emailAddressRecovery', this.emailAddressRecovery)
      formData.append('phoneNumber', this.phoneNumber)

      this.userService.updateProfile(formData).subscribe((result) => {
        console.log(result);
        this.notification.create(
          'success',
          'Thành công',
          'Cập nhật nhân viên thành công'
        );
      }, err => {
        this.notification.create(
          "error",
          err.error.message,
          ""
        )
      })


    } else {
      this.notification.create(
        'error',
        'Lỗi',
        'Vui lòng nhập thông tin cần thay đổi'
      );

    }

  }

  checkEmailFormat: boolean = true
  checkPhoneNumberFormat: boolean = true
  checkEmail() {

    var validRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (this.emailAddressRecovery != '') {
      if (!this.emailAddressRecovery.match(validRegex)) {
        this.checkEmailFormat = false
      } else {
        this.checkEmailFormat = true
      }
    } else {
      this.checkEmailFormat = true
    }
  }
  checkPhoneNumber() {
    var validRegex = /^0[0-9]{9}$/g
    if (this.phoneNumber != '') {
      if (this.phoneNumber.match(validRegex)) {
        this.checkPhoneNumberFormat = true
      } else {
        this.checkPhoneNumberFormat = false
      }
    } else {
      this.checkPhoneNumberFormat = false
    }


  }


}
