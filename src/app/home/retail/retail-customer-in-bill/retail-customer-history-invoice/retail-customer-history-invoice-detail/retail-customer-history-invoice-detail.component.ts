import { ProductService } from './../../../../../core/services/product/product.service';
import { Component, Input, OnInit } from '@angular/core';
import { NzNotificationService } from "ng-zorro-antd/notification";

@Component({
  selector: 'app-retail-customer-history-invoice-detail',
  templateUrl: './retail-customer-history-invoice-detail.component.html',
  styleUrls: ['./retail-customer-history-invoice-detail.component.css']
})
export class RetailCustomerHistoryInvoiceDetailComponent implements OnInit {

  @Input() invoiceID: number = 0
  @Input() invoiceDate: any

  ListProductInInvoiceDetail: any[] = []

  constructor(
    private productService: ProductService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.productService.getInvoiceDetailByInvoiceID(this.invoiceID).subscribe((result) => {
      this.ListProductInInvoiceDetail = result.data
    }, err => {
      this.notification.create(
        "error",
        err.error.message,
        ""
      )
    })
  }

}
