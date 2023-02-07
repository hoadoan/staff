import { Observable } from 'rxjs';
import { ACCESSTOKEN, DOMAIN } from './../../utils/AppConfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // token = ;
  headers: any;
  constructor(
    private httpClient: HttpClient
  ) {
  }

  getListCustomerSearch(value: string): Observable<any> {
    return this.httpClient.get(DOMAIN + `user-management/customers/filter?phoneNumber=${value}&pageSize=10`, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  getProfile(): Observable<any> {
    // console.log(localStorage.getItem(ACCESSTOKEN));

    this.headers = new HttpHeaders({
      'authorization': localStorage.getItem(ACCESSTOKEN)!,
      'accept': '*/*',
      'Access-Control-Allow-Origin': '*'
    });

    return this.httpClient.get(DOMAIN + 'user-management/auth/user/profile', {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  updateProfile(data: FormData): Observable<any> {
    return this.httpClient.put(DOMAIN + 'user-management/staffs/profile', data, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  changePassword(data: FormData): Observable<any> {
    return this.httpClient.put(DOMAIN + 'user-management/accounts/change-password', data, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  getCustomerByID(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `user-management/customers/${id}`, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }
  getInvoiceByIdStaff(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `invoice-management/users/${id}/invoices`, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }
  getGRNByIdStaff(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `goods-receipt-note-management/staff/goods-receipt-notes`, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  getTokenVerifyPassword(data: any): Observable<any> {
    return this.httpClient.post(DOMAIN + 'user-management/token-verify-password', data)
  }
  resetPassword(data: FormData): Observable<any> {
    return this.httpClient.put(DOMAIN + 'user-management/accounts/reset-password', data)
  }
}
