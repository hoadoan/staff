import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../../../core/services/product/product.service";
import {log} from "ng-zorro-antd/core/logger";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-retail-customer-history-invoice',
  templateUrl: './retail-customer-history-invoice.component.html',
  styleUrls: ['./retail-customer-history-invoice.component.css']
})
export class RetailCustomerHistoryInvoiceComponent implements OnInit {

  @Input() customerId: number = 0

  listInvoiceID: any[] = []

  constructor(
    private productService: ProductService,
    private notification: NzNotificationService
  ) {
  }

  ngOnInit(): void {
    console.log(this.customerId)
    this.productService.getListInvoicebyCustomerID(this.customerId).subscribe((result) => {
      this.listInvoiceID = result.data
      console.log(this.listInvoiceID);

    },err =>{
      this.notification.create(
        "error",
        err.error.message,
        ""
      )
    })
  }

}
