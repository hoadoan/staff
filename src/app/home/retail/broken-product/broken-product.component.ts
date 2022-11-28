import {Component, OnInit} from '@angular/core';
import {createSelector, Store} from "@ngrx/store";
import {UserService} from "../../../core/services/user/user.service";
import {ProductService} from "../../../core/services/product/product.service";
import {Router} from "@angular/router";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Observable} from "rxjs";
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
  }

  exportBrokenProduct() {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Bán hàng',
      nzContent: 'xuất hóa đơn',
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
            goodsIssueNote: element.listBatches
          })
        })
        this.invoice = {...this.invoice,goodsIssueNoteTypeId: 2, product: tempproduct}
        console.log(this.invoice)
        if (this.invoice.product.length <= 0) {
          this.notification.create(
            "error",
            'Thiếu thông tin thuốc',
            "Vui lòng chọn thuốc cần bán"
          )
        } else {
          this.productservice.retailInvoice(this.invoice).subscribe((result) => {
            console.log(result.message)
            if (result) {

              this.notification.create(
                "success",
                result.message,
                ""
              )
              this.store.dispatch(counterSlice.resetState('ok'))
              let currentUrl = this.router.url;
              this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this.router.navigate([currentUrl]);
              })
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

}
