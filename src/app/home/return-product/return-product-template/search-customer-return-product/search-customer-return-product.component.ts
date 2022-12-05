import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from './../../../../core/services/user/user.service';
import { ProductService } from 'src/app/core/services/product/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-customer-return-product',
  templateUrl: './search-customer-return-product.component.html',
  styleUrls: ['./search-customer-return-product.component.css']
})
export class SearchCustomerReturnProductComponent implements OnInit {

  selectedValue: any
  listCustomer: any[] = []

  constructor(
    private user: UserService,
    private productservice: ProductService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
  }



  searchcustomer(value: string) {
    if (value == '') {
      value = '0'
    }
    this.user.getListCustomerSearch(value).subscribe((result) => {
      this.listCustomer = result.items
    }, err => {
      this.notification.create(
        "error",
        err.error.message,
        ""
      )
    })
  }

  addcustomer() {


  }

}
