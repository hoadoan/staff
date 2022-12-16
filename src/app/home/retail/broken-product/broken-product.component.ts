import { Component, OnInit } from '@angular/core';
import { createSelector, Store } from "@ngrx/store";
import { UserService } from "../../../core/services/user/user.service";
import { ProductService } from "../../../core/services/product/product.service";
import { Router } from "@angular/router";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { Observable } from "rxjs";
import * as counterSlice from "./../../../core/store/store.slice";

@Component({
  selector: 'app-broken-product',
  templateUrl: './broken-product.component.html',
  styleUrls: ['./broken-product.component.css']
})
export class BrokenProductComponent implements OnInit {


  // danh sách sản phẩm
  listProductInBill$: Observable<any> | undefined // lấy từ kho lưu trữ (store.slice.ts)
  listProductInBill: any[] = [] // lưu thông tin lấy từ kho lưu trữ (listProductInBill$)
  invocie$: Observable<any> | undefined
  invoice: any
  totalBillPrice: number = 0


  confirmModal?: NzModalRef;

  constructor(
    private user: UserService,
    private productservice: ProductService,
    private router: Router,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private store: Store<{}>
  ) {
  }

  ngOnInit(): void {
    this.listProductInBill$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.ListProductInbill)
    )
    this.listProductInBill$.subscribe((result) => {
      this.listProductInBill = result
      if (this.listProductInBill.length > 0) {
        this.totalBillPrice = 0
        this.listProductInBill.forEach((element) => {
          element.listBatches.forEach((batch: any) => {
            this.productservice.getProductUnitbyUnitID(batch.unit).subscribe((result) => {
              this.totalBillPrice += (batch.quantity * result.data.price)
            }, err => {
              this.notification.create(
                "error",
                err.error.message,
                ""
              )
            })
          })
        })
      }
    })
  }

  exportBrokenProduct() {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Xác nhận',
      nzContent: 'Khi bấm xác nhận thuốc trong danh sách sẽ bị loại bỏ ra khỏi hệ thống',
      nzOkText: 'Xác nhận',
      nzOnOk: () => {

        this.listProductInBill$ = this.store.select(
          createSelector(counterSlice.selectFeature, (state) => state.ListProductInbill)
        )
        this.listProductInBill$.subscribe((result) => {
          this.listProductInBill = result
        })

        this.invocie$ = this.store.select(
          createSelector(counterSlice.selectFeature, (state) => state.invoice)
        )
        this.invocie$.subscribe((result) => {
          this.invoice = result
        })

        let tempproduct = [...this.invoice.product]

        this.listProductInBill.forEach((element, index) => {
          tempproduct.push({
            productId: element.product.id,
            use: element.use,
            goodsIssueNote: element.listBatches
          })
        })
        this.invoice = { ...this.invoice, goodsIssueNoteTypeId: 2, product: tempproduct, usePoint: 0, customerId: null, customer: null }
        console.log(this.invoice)
        if (this.invoice.product.length <= 0) {
          this.notification.create(
            "error",
            'Thiếu thông tin thuốc',
            "Vui lòng chọn thuốc cần xuất"
          )
        } else {
          this.productservice.retailInvoice(this.invoice).subscribe((result) => {
            console.log(result)
            if (result) {
              this.isVisibleBrokenReport = true
              this.brokenId = result.data.invoiceId
              this.notification.create(
                "success",
                result.message,
                ""
              )
              this.store.dispatch(counterSlice.resetState('ok'))
              // let currentUrl = this.router.url;
              // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              //   this.router.navigate([currentUrl]);
              // })
            }
          }, err => {
            this.notification.create(
              "error",
              err.error.message,
              ""
            )
          })
        }
      }
    })
  }


  isVisibleBrokenReport: boolean = false
  brokenId: number = 0

  handleCancelBrokenReport() {
    this.isVisibleBrokenReport = false
  }

  handleOkBrokenReport() {
    this.isVisibleBrokenReport = false
    document.getElementById('print__bill__data__broken')?.click()
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });

  }


}
