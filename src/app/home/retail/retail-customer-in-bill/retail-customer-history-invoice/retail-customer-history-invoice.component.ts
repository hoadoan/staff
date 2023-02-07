import { product, customer } from './../../retail.model';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from "../../../../core/services/product/product.service";
import { NzNotificationService } from "ng-zorro-antd/notification";
import * as counterSlice from "./../../../../core/store/store.slice";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-retail-customer-history-invoice',
  templateUrl: './retail-customer-history-invoice.component.html',
  styleUrls: ['./retail-customer-history-invoice.component.css']
})
export class RetailCustomerHistoryInvoiceComponent implements OnInit {

  @Input() customerId: number = 0
  @Input() status: number = 0

  ListProductInInvoiceDetail: any[] = []

  listInvoiceID: any[] = []

  constructor(
    private productService: ProductService,
    private notification: NzNotificationService,
    private readonly store: Store<{}>
  ) {
  }

  ngOnInit(): void {
    this.productService.getListInvoicebyCustomerID(this.customerId).subscribe((result) => {
      this.listInvoiceID = result.data
      // console.log(this.listInvoiceID);
    }, err => {
      this.notification.create(
        "error",
        err.error.message,
        ""
      )
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes['customerId'].currentValue);

    this.productService.getListInvoicebyCustomerID(changes['customerId'].currentValue).subscribe((result) => {
      this.listInvoiceID = result.data
      // console.log(this.listInvoiceID);
    }, err => {
      this.notification.create(
        "error",
        err.error.message,
        ""
      )
    })

  }

  SelectInvoice(id: number, barcode: string) {

    if (this.status == 1) {
      this.store.dispatch(counterSlice.addInvoiceID(barcode))
    } else {
      this.productService.getInvoiceDetailByInvoiceID(id).subscribe((result) => {
        this.ListProductInInvoiceDetail = result.data
        this.ListProductInInvoiceDetail.forEach((item: any) => {
          this.productService.getProductByID(item.product.id).subscribe((resultProduct) => {
            this.store.dispatch(counterSlice.addProducttoListBill({
              product: resultProduct.data,
              use: null,
              listBatches: []
            }))
          })
        })
      }, err => {
        this.notification.create(
          "error",
          err.error.message,
          ""
        )
      })
    }
  }

}
