import { ACCESSTOKEN, PROFILE } from './../../core/utils/AppConfig';
import { UserService } from './../../core/services/user/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from "ng-zorro-antd/notification";

@Component({
  selector: 'app-home-template',
  templateUrl: './home-template.component.html',
  styleUrls: ['./home-template.component.css']
})
export class HomeTemplateComponent implements OnInit {

  avatar: string = ''
  fullname: string = ''

  constructor(
    private route: Router,
    private user: UserService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem(ACCESSTOKEN)) {
      this.user.getProfile().subscribe((result) => {
        localStorage.setItem(PROFILE, JSON.stringify(result.data))
        this.avatar = result.data.avatar
        this.fullname = result.data.fullname
      }, err => {
        console.log('ok');

        this.notification.create(
          "error",
          err.error.message,
          ""
        )
      })
    }
  }

  logout() {
    localStorage.clear()
    localStorage.removeItem(PROFILE)
    localStorage.removeItem(ACCESSTOKEN)
    this.route.navigate([''])
  }

}
