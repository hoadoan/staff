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
  @Input() statusReturnProduct: number = 0

  ListProductInInvoiceDetail: any[] = []

  constructor(
    private productService: ProductService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    console.log(this.statusReturnProduct);

    // let element = document.getElementById('detail__history')

    // if(element){
    //   if(this.statusReturnProduct == 2){
    //     element.style.backgroundColor = 'yellow'
    //   }else if(this.statusReturnProduct == 3){
    //     element.style.backgroundColor = 'red'
    //   }

    // }

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
