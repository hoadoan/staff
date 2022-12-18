import { ACCESSTOKEN, PROFILE } from './../../core/utils/AppConfig';
import { UserService } from './../../core/services/user/user.service';
import { Router } from '@angular/router';
import { Component, OnInit, ElementRef } from '@angular/core';
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

  ProfileInfo() {
    this.user.getProfile().subscribe((result) => {
      console.log(result);
      this.avatar = result.data.avatar
      this.fullname = result.data.fullname
    }, err => {
      this.notification.create(
        "error",
        err.error.message,
        ""
      )
    })
  }

  ngOnInit(): void {

    if (localStorage.getItem(ACCESSTOKEN)) {
      console.log(localStorage.getItem(ACCESSTOKEN));

      setTimeout(() => {
        console.log(localStorage.getItem(ACCESSTOKEN));
        
        this.user.getProfile().subscribe((result) => {
          console.log(result);
          this.avatar = result.data.avatar
          this.fullname = result.data.fullname
        }, err => {
          this.notification.create(
            "error",
            err.error.message,
            ""
          )
        })
      }, 1000);

    }
  }

  logout() {
    localStorage.clear()
    localStorage.removeItem(PROFILE)
    localStorage.removeItem(ACCESSTOKEN)
    this.route.navigate([''])
    let currentUrl = this.route.url;
    if (currentUrl == '') {
      location.reload()
      window.localStorage.clear();
    }
  }

}
