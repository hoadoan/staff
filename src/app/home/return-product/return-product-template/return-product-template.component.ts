import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../core/services/product/product.service";
import {createSelector, Store} from "@ngrx/store";
import * as counterSlice from "./../../../core/store/store.slice";
import {Observable} from "rxjs";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {goodsIssueNoteInterface, goodsReceiptNoteInterface, listBatchInterface} from "../../../core/store/store.model";
import {goodReceiptNote} from "./../../../core/store/store.slice";
import {Router} from "@angular/router";

@Component({
  selector: 'app-return-product-template',
  templateUrl: './return-product-template.component.html',
  styleUrls: ['./return-product-template.component.css']
})
export class ReturnProductTemplateComponent implements OnInit {

  invoiceBarcode: string = ''

  invoiceData: any
  invoiceDetailData: any
  invoiceDetailData$: Observable<any> | undefined
  switchFullInvocie: boolean = true
  returnTotalPrice: number = 0

  goodsReceiptNote: goodsReceiptNoteInterface = {
    goodsReceiptNoteTypeId: 2,
    createModel: [{
      batches: []
    }],
    invoiceId: 0,
    isFull: true
  }


  constructor(
    private productService: ProductService,
    private store: Store<{}>,
    private notification: NzNotificationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.invoiceDetailData$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.ListReturnProduct)
    )
    this.invoiceDetailData$.subscribe((result) => {
      this.invoiceDetailData = result
      this.returnTotalPrice = 0
      this.invoiceDetailData.forEach((element: any, index: number) => {
        this.returnTotalPrice += element.quantity * element.unitPrice
      })
    })


  }

  searchInvocie() {
    console.log(this.invoiceBarcode)
    if (this.invoiceBarcode.length == 13) {
      if (this.invoiceBarcode.slice(0, 3) === 'INV') {
        this.productService.getInvocieByBarcode(this.invoiceBarcode).subscribe((result) => {
          this.invoiceData = result.data
          this.goodsReceiptNote.invoiceId = this.invoiceData.id
          console.log(this.invoiceData)
        }, err => {
          this.notification.create(
            "error",
            err.error.message,
            ""
          )
        })
        this.productService.getInvocieDetailByBarcode(this.invoiceBarcode).subscribe((result) => {
          this.invoiceDetailData = result.data
          this.store.dispatch(counterSlice.addListReturnProduct(this.invoiceDetailData))
          this.invoiceDetailData$ = this.store.select(
            createSelector(counterSlice.selectFeature, (state) => state.ListReturnProduct)
          )
          this.invoiceDetailData$.subscribe((result) => {
            this.invoiceDetailData = result
            this.returnTotalPrice = 0
            this.invoiceDetailData.forEach((element: any, index: number) => {
              this.returnTotalPrice += element.quantity * element.unitPrice
            })
          })
        })
      }
    }
  }

  ReturnProduct() {
    if (this.invoiceData) {
      if (this.switchFullInvocie) {
        let full = {
          goodsReceiptNoteTypeId: 2,
          invoiceId: this.invoiceData.id,
          createModel: null,
          isFull: true
        }
        console.log(full)
        this.productService.PostGoodReceiptNoteManager(full).subscribe((result) => {
          console.log(result)
          this.notification.create(
            "success",
            result.message,
            ""
          )
          this.store.dispatch(counterSlice.resetState('ok'))
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
          });

        }, err => {
          this.notification.create(
            "error",
            err.error.message,
            ""
          )
        })
      } else {
        let goodReceiptNote$ = this.store.select((
          createSelector(counterSlice.selectFeature, (state) => state.goodsReceiptNote)
        ))
        let a: any = null
        goodReceiptNote$.subscribe((result1) => {

            a = result1

          }
        )

        if (a != null) {
          this.productService.PostGoodReceiptNoteManager(a).subscribe((result) => {
            this.notification.create(
              "success",
              result.message,
              ""
            )
            this.store.dispatch(counterSlice.resetState('ok'))
            let currentUrl = this.router.url;
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([currentUrl]);
            });
          }, err => {
            console.log(err.error)
            this.notification.create(
              "error",
              err.error.message,
              ""
            )
          })
        }

      }
    } else {
      this
        .notification
        .create(
          "error"
          ,
          'Không có thông tin'
          ,
          'Vui lòng nhập đơn hàng để có thông tin đơn hàng'
        );
    }


  }

  checkReturnFullProduct() {
    this.goodsReceiptNote.isFull = this.switchFullInvocie
    console.log(this.goodsReceiptNote)
    let listBatch: any[] = []
    if (this.switchFullInvocie != true) {
      this.invoiceDetailData.forEach((item: any, index: number) => {

          console.log(item)

          this.productService.getListProductUnitByProductId(item.product.id).subscribe((result) => {
            listBatch = [...listBatch, {
              batchId: item.batch.id,
              quantity: item.quantity,
              productUnitPriceId: result.data[0].id,
              totalPrice: item.unitPrice * item.quantity,
              batch: null
            }]

            this.goodsReceiptNote.createModel[0].batches = listBatch
            console.log(this.goodsReceiptNote)
            if (this.goodsReceiptNote.createModel[0].batches.length == this.invoiceDetailData.length) {
              this.store.dispatch(counterSlice.goodReceiptNote(this.goodsReceiptNote))
            }
          })

        }
      )
    }


  }
}
