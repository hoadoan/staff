import { Component, Input, OnInit } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { ProductService } from 'src/app/core/services/product/product.service';
import * as counterSlice from "../../../../core/store/store.slice";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { Observable } from "rxjs";

@Component({
  selector: '[app-retail-product-in-bill-batch]',
  templateUrl: './retail-product-in-bill-batch.component.html',
  styleUrls: ['./retail-product-in-bill-batch.component.css']
})
export class RetailProductInBillBatchComponent implements OnInit {

  @Input() batch: any
  @Input() useNote: string | null = null
  confirmModal?: NzModalRef;
  quantity: number = 0
  unitID: number = 0
  maxQuantity: number = 0

  listUnitProductPrice: any;
  batchInfo: any
  unitInfo: any
  productInfo: any

  //
  listProductInBill$: Observable<any> | undefined // lấy từ kho lưu trữ (store.slice.ts)
  listProductInBill: any[] = [] // lưu thông tin lấy từ kho lưu trữ (listProductInBill$)

  constructor(
    private productService: ProductService,
    private store: Store<{}>,
    private modal: NzModalService
  ) {
  }

  ngOnInit(): void {
    this.quantity = this.batch.quantity
    this.unitID = this.batch.unit


    this.productService.getBatchByBatchID(this.batch.batchId).subscribe(batch => {
      this.listUnitProductPrice = batch.data.currentQuantity
      this.batchInfo = batch.data
      this.listUnitProductPrice.forEach((unit: any) => {
        if (unit.id == this.batch.unit) {
          this.maxQuantity = unit.currentQuantity
        }
      })

      this.productService.getProductUnitbyUnitID(this.batch.unit).subscribe((result: any) => {
        this.unitInfo = result.data
      })

      this.productService.getProductByID(this.batchInfo.product.id).subscribe(data => {
        this.productInfo = data.data
      })

      this.listProductInBill$ = this.store.select(
        createSelector(counterSlice.selectFeature, (state) => state.ListProductInbill)
      )
      this.listProductInBill$.subscribe((result) => {
        this.listProductInBill = result
      })
    })
  }


  deleteconsignment() {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Xóa lô',
      nzContent: 'Bạn có chắc muốn xóa lô thuốc này',
      nzOnOk: () => {
        this.store.dispatch(counterSlice.deleteBacthProductInBill(this.batchInfo))
      }
    });
  }

  changeQuantity() {
    let tempListProductInBill = [...this.listProductInBill]
    let tempListBatches: any[] = []

    tempListProductInBill.forEach((unit: any, index) => {
      if (unit.product.id === this.batchInfo.product.id) {
        tempListBatches = [...unit.listBatches]
        tempListBatches.forEach((batch: any, index: number) => {
          if (batch.batchId === this.batch.batchId) {
            tempListBatches[index] = {
              ...batch,
              quantity: this.quantity
            }
          }
        })
      }
    })

    this.store.dispatch(counterSlice.addBatchesToProductinBill({
      product: this.productInfo,
      use: this.useNote,
      listBatches: tempListBatches
    }))
  }

  changeUnit() {
    this.listUnitProductPrice.forEach((unit: any) => {
      if (unit.id == this.unitID) {
        this.maxQuantity = unit.currentQuantity
      }
    })
    this.productService.getProductUnitbyUnitID(this.unitID + '').subscribe((result: any) => {
      this.unitInfo = result.data
    })

    let tempListProductInBill = [...this.listProductInBill]
    let tempListBatches: any[] = []

    tempListProductInBill.forEach((unit: any, index) => {
      if (unit.product.id === this.batchInfo.product.id) {
        tempListBatches = [...unit.listBatches]
        tempListBatches.forEach((batch: any, index: number) => {
          if (batch.batchId === this.batch.batchId) {
            tempListBatches[index] = {
              ...batch,
              unit: this.unitID
            }
          }
        })
      }
    })

    this.store.dispatch(counterSlice.addBatchesToProductinBill({
      product: this.productInfo,
      use: this.useNote,
      listBatches: tempListBatches
    }))
  }

}
