import { Observable } from 'rxjs';
import { invoiceInterface, product } from './../retail.model';
import { createSelector, Store } from '@ngrx/store';
import { ProductService } from './../../../core/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import * as counterSlice from "./../../../core/store/store.slice";

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

    this.listProductInBill$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.ListProductInbill)
    )
    this.listProductInBill$.subscribe((result) => {
      this.listProductInBill = result

    })
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
                item.listBatches.forEach((batch: any) => {
                  if (batch.batchId === result.items[0].batches[0].id) {
                    checkBatchExist = false
                  }
                })
                if (checkBatchExist) {
                  productsearchInbill = item
                  let tempListBatches = [...productsearchInbill.listBatches]
                  tempListBatches = [...tempListBatches, {
                    quantity: 1,
                    unit: result.items[0].batches[0].currentQuantity[0].id,
                    batchId: result.items[0].batches[0].id
                  }]
                  this.productservice.getProductByID(result.items[0].id).subscribe((result2) => {
                    this.store.dispatch(counterSlice.addBatchesToProductinBill({
                      product: result2.data,
                      use: null,
                      listBatches: tempListBatches
                    }))
                  })
                  let a = document.getElementById('tippy__search__product')?.style
                  if (a) {
                    a.display = "none"
                  }
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
            this.searchValue = ''
            let a = document.getElementById('tippy__search__product')?.style
            if (a) {
              a.display = "none"
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
            let a = document.getElementById('tippy__search__product')?.style
            if (a) {
              a.display = "none"
            }
            this.searchValue = ''
          }

          let a = document.getElementById('tippy__search__product')?.style
          if (a) {
            a.display = "none"
          }

        }, err => {
          this.notification.create(
            'error',
            err.error.message,
            ''
          )
        })
      }
    } else {

      

      this.productservice.searchProduct(this.searchValue).subscribe((result) => {
        console.log(result.items);

        this.listSearchProduct = []
        result.items.forEach((element: any) => {
          if (element.batches) {
            this.listSearchProduct.push(element)
          }
        });

        // this.listSearchProduct = result.items
        let a = document.getElementById('tippy__search__product')?.style
        if (this.searchValue != '') {
          if (a) {
            a.display = "block"
          }
        } else {
          if (a) {
            a.display = 'none'
          }
        }
      })
    }
    this.listProductInBill$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.ListProductInbill)
    )
    this.listProductInBill$.subscribe((result) => {
      this.listProductInBill = result
    })
  }

  addToListBill(id: number): void {
    this.searchValue = id
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
            use: null,
            listBatches: []
          }))
          this.searchValue = ''
        } else {
          this.notification.create(
            'error',
            'Lỗi',
            'Sản phẩm đã tồn tại trong hóa đơn'
          )
        }
      } else {
        this.store.dispatch(counterSlice.addProducttoListBill({
          product: result.data,
          use: null,
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
