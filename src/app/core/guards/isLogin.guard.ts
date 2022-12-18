import { ACCESSTOKEN } from './../utils/AppConfig';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class isLoginGuard implements CanActivate {

    //router dùng để chuyển hướng trang (giống history.push của react)
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (localStorage.getItem(ACCESSTOKEN)) {
            return true;
        }

        alert('Đăng nhập để vào trang này !')
        this.router.navigate(['/login'])
        return false;
    }
}