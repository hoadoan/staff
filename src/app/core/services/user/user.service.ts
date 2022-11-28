import { Observable } from 'rxjs';
import { ACCESSTOKEN, DOMAIN } from './../../utils/AppConfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token = localStorage.getItem(ACCESSTOKEN);
  headers: any;
  constructor(
    private httpClient: HttpClient
  ) {
    this.headers = new HttpHeaders({
      'authorization': this.token!,
      'accept': '*/*',
      'Access-Control-Allow-Origin': '*'
    });
  }

  getListCustomerSearch(value: string): Observable<any> {
    return this.httpClient.get(DOMAIN + `user-management/customers/filter?phoneNumber=${value}&pageSize=10`, { headers: this.headers })
  }

  getProfile(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'user-management/auth/user/profile', { headers: this.headers })
  }

  updateProfile(data: FormData): Observable<any> {
    return this.httpClient.put(DOMAIN + 'user-management/staffs/profile', data, { headers: this.headers })
  }

  changePassword(data: FormData): Observable<any> {
    return this.httpClient.put(DOMAIN + 'user-management/accounts/change-password', data, { headers: this.headers })
  }

  getCustomerByID(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `user-management/customers/${id}`, { headers: this.headers })
  }

}
