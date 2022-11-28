import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../../core/services/product/product.service";
import {createSelector, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as counterSlice from "./../../../core/store/store.slice";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {Router} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-retail-invoice',
  templateUrl: './retail-invoice.component.html',
  styleUrls: ['./retail-invoice.component.css']
})
export class RetailInvoiceComponent implements OnInit {

  confirmModal?: NzModalRef;


  @Input() invoiceID: number = 0

  today: number = Date.now()

  invoiceData: any
  invoiceDetail: any[] = []
  @Input() totalBillPrice: number = 0
  @Input() usePointPrice = 0


  constructor(
    private productService: ProductService,
    private store: Store<{}>,
    private modal: NzModalService,
    private router: Router,
    private notification: NzNotificationService
  ) {
  }

  ngOnInit(): void {
  }

  printBill() {
    console.log(this.invoiceID)
    console.log(this.invoiceDetail)

    if (this.invoiceID != 0) {
      this.productService.getInvocieByInvoiceID(this.invoiceID).subscribe((result) => {
        this.invoiceData = result.data
        console.log(this.invoiceData)
      },err =>{
        this.notification.create(
          "error",
          err.error.message,
          ""
        )
      })
      this.productService.getInvoiceDetailByInvoiceID(this.invoiceID).subscribe((reuslt) => {
        this.invoiceDetail = reuslt.data
        this.totalBillPrice = 0

        this.invoiceDetail.forEach((item: any) => {
          this.totalBillPrice += item.quantity * item.unitPrice
        })
        console.log(this.invoiceDetail)
        if (this.invoiceDetail.length != 0) {
          console.log(this.totalBillPrice)
          if (this.totalBillPrice > 0) {
            this.confirmModal = this.modal.confirm({
              nzTitle: 'Mở máy in',
              nzContent: 'Bấm ok để mở máy in',
              nzOnOk: () => {
                document.getElementById('print__bill__data')?.click()

                this.store.dispatch(counterSlice.resetState('ok'))
                let currentUrl = this.router.url;
                this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                  this.router.navigate([currentUrl]);
                });
              },
              nzOnCancel: () => {
                this.store.dispatch(counterSlice.resetState('ok'))
                let currentUrl = this.router.url;
                this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                  this.router.navigate([currentUrl]);
                });
              }
            })
          }
        }
      },err =>{
        this.notification.create(
          "error",
          err.error.message,
          ""
        )
      })
    } else {
      console.log("k in đc:")
    }
  }
}
