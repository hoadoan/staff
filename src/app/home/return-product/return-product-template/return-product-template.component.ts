import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';
import { batchs } from './../../input/input-element/input-element.model';
import { goodsIssueNote } from './../../retail/retail.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../../core/services/product/product.service";
import { createSelector, Store } from "@ngrx/store";
import * as counterSlice from "./../../../core/store/store.slice";
import { Observable } from "rxjs";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { goodsIssueNoteInterface, goodsReceiptNoteInterface, listBatchInterface } from "../../../core/store/store.model";
import { goodReceiptNote } from "./../../../core/store/store.slice";
import { Router } from "@angular/router";

@Component({
  selector: 'app-return-product-template',
  templateUrl: './return-product-template.component.html',
  styleUrls: ['./return-product-template.component.css']
})
export class ReturnProductTemplateComponent implements OnInit {

  isVisibleReturnProduct: boolean = false;

  invoiceBarcode$: Observable<any> | undefined
  invoiceBarcode: string = ''

  invoiceData: any
  invoiceDetailData: any
  invoiceDetailData$: Observable<any> | undefined
  switchFullInvocie: boolean = true
  returnTotalPrice: number = 0

  goodsIssueNote$: Observable<any> | undefined

  goodsReceiptNote: any = {
    goodsReceiptNoteTypeId: 2,
    createModel: [{
      batches: []
    }] as any,
    invoiceId: 0,
    isFull: true
  }
  confirmModal?: NzModalRef;



  constructor(
    private productService: ProductService,
    private store: Store<{}>,
    private notification: NzNotificationService,
    private router: Router,
    private modal: NzModalService
  ) {
  }

  ngOnInit(): void {

    this.goodsIssueNote$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.goodsReceiptNote)
    )
    this.goodsIssueNote$.subscribe((result) => {
      this.goodsReceiptNote = result
      console.log(this.goodsReceiptNote);

    })

    this.invoiceBarcode$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.invoiceID)
    )
    this.invoiceBarcode$.subscribe((result) => {
      this.invoiceBarcode = result
      if (this.invoiceBarcode != '') {
        this.searchInvocie()
        this.isVisibleSearchCustomer = false
      }
    })
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

    if (this.invoiceBarcode.length == 13) {
      if (this.invoiceBarcode.slice(0, 3) === 'INV') {
        this.productService.getInvocieByBarcode(this.invoiceBarcode).subscribe((result) => {
          if (result.data) {
            this.invoiceData = result.data
            let tempGoods = { ...this.goodsReceiptNote }
            tempGoods.invoiceId = this.invoiceData.id
            this.goodsReceiptNote = { ...tempGoods }
          }
        }, err => {
          this.notification.create(
            "error",
            err.error.message,
            ""
          )
        })
        this.productService.getInvocieDetailByBarcode(this.invoiceBarcode).subscribe((result) => {

          if (result.data) {
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
            this.switchFullInvocie = true
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
  }


  listReturnProductId: any[] = []

  ReturnProduct() {
    if (this.invoiceData) {

      this.confirmModal = this.modal.confirm({
        nzTitle: 'Xác Nhận trả hàng?',
        nzContent: 'Bấm xác nhận để trả hàng',
        nzOkText:'Xác nhận',
        nzOnOk: () =>{
          if (this.switchFullInvocie) {
            let full = {
              goodsReceiptNoteTypeId: 2,
              invoiceId: this.invoiceData.id,
              createModel: null,
              isFull: true
            }
            this.productService.PostGoodReceiptNoteManager(full).subscribe((result) => {
              console.log(result)
              this.listReturnProductId = result.data
              console.log(this.listReturnProductId);
    
              this.isVisibleReturnProduct = true
              this.notification.create(
                "success",
                result.message,
                ""
              )
              this.store.dispatch(counterSlice.resetState('ok'))
              // let currentUrl = this.router.url;
              // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              //   this.router.navigate([currentUrl]);
              // });
    
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
              console.log(a);
    
            }
            )
            if (a != null) {
              this.productService.PostGoodReceiptNoteManager(a).subscribe((result) => {
                this.listReturnProductId = result?.data
                this.isVisibleReturnProduct = true
                this.notification.create(
                  "success",
                  result.message,
                  ""
                )
                this.store.dispatch(counterSlice.resetState('ok'))
                // let currentUrl = this.router.url;
                // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                //   this.router.navigate([currentUrl]);
                // });
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
      });


    } else {
      this
        .notification.create(
          "error",
          'Không có thông tin',
          'Vui lòng nhập đơn hàng để có thông tin đơn hàng'
        );
    }


  }

  checkReturnFullProduct() {
    // this.goodsReceiptNote.isFull = this.switchFullInvocie
    let tempGoods = { ...this.goodsReceiptNote }
    let tempCreateModel = [...tempGoods.createModel]
    let tempBatch = [...tempCreateModel[0].batches]

    tempGoods.isFull = this.switchFullInvocie
    this.goodsReceiptNote = { ...tempGoods }


    if (this.switchFullInvocie == false) {
      let listBatch: any[] = []
      this.invoiceDetailData.forEach((item: any, index: number) => {
        this.productService.getListProductUnitByProductId(item.product.id).subscribe((result) => {
          if (item.quantity - item.returnedQuantity > 0) {
            listBatch = [...listBatch, {
              batchId: item.batch.id,
              quantity: item.quantity - item.returnedQuantity,
              productUnitPriceId: result.data[0].id,
              totalPrice: item.unitPrice * (item.quantity - item.returnedQuantity),
              batch: null
            }]
            tempBatch = [...listBatch]
            tempCreateModel = [{ batches: tempBatch }]
            tempGoods.createModel = [...tempCreateModel]
            this.goodsReceiptNote = { ...tempGoods }
            console.log(this.goodsReceiptNote);
            if (this.goodsReceiptNote.createModel[0].batches.length == this.invoiceDetailData.length) {
              this.store.dispatch(counterSlice.goodReceiptNote(this.goodsReceiptNote))
              console.log(this.goodsReceiptNote);
            }
          }
        })
      })
    } else {
      tempCreateModel = [{ batches: [] }]
      tempGoods.createModel = [...tempCreateModel]
      this.goodsReceiptNote = { ...tempGoods }
      this.store.dispatch(counterSlice.goodReceiptNote(this.goodsReceiptNote))
      console.log(this.goodsReceiptNote);
    }
  }


  handleCancelReturnProduct() {
    this.isVisibleReturnProduct = false
    this.store.dispatch(counterSlice.resetState('ok'))
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    })
  }

  handleOkReturnProduct() {
    document.getElementById('print__bill__data__return')?.click()
    this.isVisibleReturnProduct = false
    this.store.dispatch(counterSlice.resetState('ok'))
  }


  isVisibleSearchCustomer: boolean = false
  showSearchCustomerModal() {
    this.isVisibleSearchCustomer = true
  }
  handleCancelSearchCustomer() {
    this.isVisibleSearchCustomer = false
  }
  handleOkSearchCustomer() {
    this.isVisibleSearchCustomer = false
  }
}
