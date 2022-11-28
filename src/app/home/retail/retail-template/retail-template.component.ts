import {Observable} from 'rxjs';
import {invoiceInterface, product} from './../retail.model';
import {createSelector, Store} from '@ngrx/store';
import {ProductService} from './../../../core/services/product/product.service';
import {Component, OnInit} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import * as counterSlice from "./../../../core/store/store.slice";
import {log} from "ng-zorro-antd/core/logger";

@Component({
  selector: 'app-retail-template',
  templateUrl: './retail-template.component.html',
  styleUrls: ['./retail-template.component.css']
})
export class RetailTemplateComponent implements OnInit {

  switchValue = false;

  // tìm kiếm sản phẩm
  searchValue: any
  listSearchProduct: any[] = [];

  // danh sách sản phẩm
  listProductInBill$: Observable<any> | undefined // lấy từ kho lưu trữ (store.slice.ts)
  listProductInBill: any[] = [] // lưu thông tin lấy từ kho lưu trữ (listProductInBill$)

  isVisibleAddBatch: boolean = false; // show modal add product batch when add new product to bill

  invoice: invoiceInterface = {
    goodsIssueNoteTypeId: 1,
    usePoint: 0,
    customerId: null,
    product: [],
    customer: null
  }
  // invoice$: Observable<any> | undefined
  // listProductInvoice:


  constructor(
    private productservice: ProductService,
    private notification: NzNotificationService,
    private readonly store: Store<{}>
  ) {
  }

  ngOnInit(): void {

    // this.listProductInBill$ = this.store.select(
    //   createSelector(counterSlice.selectFeature, (state) => state.ListProductInbill)
    // )
    // this.listProductInBill$.subscribe((result) => {
    //   this.listProductInBill = result
    // })
  }

  UnShowListSearchProduct() {

    let a = document.getElementById('tippy__search__product')?.style

    if (a) {
      a.display = "none"
    }

  }

  searchProduct(value: any): void {

    let productsearchInbill

    if (this.searchValue.length === 13) {
      if (this.searchValue.slice(0, 3) == 'BAT') {
        this.productservice.searchProduct(this.searchValue).subscribe((result) => {
          if (this.listProductInBill.length > 0) {
            let checkBatchExist = true
            this.listProductInBill.forEach((item) => {
              if (result.items[0].id === item.product.id) {
                productsearchInbill = item
                item.listBatches.forEach((batch: any) => {
                  if (batch.batchId === result.items[0].batches[0].id) {
                    checkBatchExist = false
                  }
                })
                if (checkBatchExist) {
                  let tempListBatches = [...productsearchInbill.listBatches]
                  tempListBatches = [...tempListBatches, {
                    quantity: 1,
                    unit: result.items[0].batches[0].currentQuantity[0].id,
                    batchId: result.items[0].batches[0].id
                  }]
                  this.productservice.getProductByID(result.items[0].id).subscribe((result2) => {
                    this.store.dispatch(counterSlice.addBatchesToProductinBill({
                      product: result2.data,
                      listBatches: tempListBatches
                    }))
                  })
                } else {
                  this.notification.create(
                    'error',
                    "Lô đã tồn tại",
                    'Vui lòng chọn lô khác'
                  )
                }
              } else {
                this.productservice.getProductByID(result.items[0].id).subscribe((result2) => {
                  this.store.dispatch(counterSlice.addProducttoListBill({
                    product: result2.data,
                    listBatches: [
                      {
                        quantity: 1,
                        unit: result.items[0].batches[0].currentQuantity[0].id,
                        batchId: result.items[0].batches[0].id
                      }
                    ]
                  }))
                })
              }
            })

          } else {
            this.productservice.getProductByID(result.items[0].id).subscribe((result2) => {
              this.store.dispatch(counterSlice.addProducttoListBill({
                product: result2.data,
                listBatches: [
                  {
                    quantity: 1,
                    unit: result.items[0].batches[0].currentQuantity[0].id,
                    batchId: result.items[0].batches[0].id
                  }
                ]
              }))
            })

          }
        })
      }
    }
    this.productservice.searchProduct(this.searchValue).subscribe((result) => {
      this.listSearchProduct = result.items
      console.log(this.listSearchProduct)
      let a = document.getElementById('tippy__search__product')?.style
      // if (this.listSearchProduct.length > 0) {
      if (a) {
        a.display = "block"
      }
      // }
    })


    this.listProductInBill$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.ListProductInbill)
    )
    this.listProductInBill$.subscribe((result) => {
      this.listProductInBill = result
    })
  }

  addToListBill(id: number): void {
    this.searchValue = id
    console.log(id)
    this.productservice.getProductByID(this.searchValue).subscribe((result) => {
      let checkProductExist = true
      if (this.listProductInBill.length > 0) {
        for (const listProductInBillElement of this.listProductInBill) {
          if (listProductInBillElement.product.id == result.data.id) {
            checkProductExist = false
          }
        }
        if (checkProductExist) {
          this.store.dispatch(counterSlice.addProducttoListBill({
            product: result.data,
            listBatches: []
          }))
          this.searchValue = ''
        } else {
          this.notification.create(
            'Error',
            'Lỗi',
            'Sản phẩm đã tồn tại trong hóa đơn'
          )
        }
      } else {
        this.store.dispatch(counterSlice.addProducttoListBill({
          product: result.data,
          listBatches: []
        }))

        this.searchValue = ''
      }

    })

    this.listProductInBill$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.ListProductInbill)
    )
    this.listProductInBill$.subscribe((result) => {
      this.listProductInBill = result
    })
  }


}
