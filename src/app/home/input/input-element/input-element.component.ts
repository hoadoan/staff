import { product } from './../../retail/retail.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, createSelector } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { goodsReceiptNoteInterface, batch, batchs } from './input-element.model';
import { ProductService } from './../../../core/services/product/product.service';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import * as counterSlice from "./../../../core/store/store.slice";
import { batchInterface, listBatchInterface, ListInputProductInterface } from "../../../core/store/store.model";

import { differenceInCalendarDays, setHours } from 'date-fns';

import { DisabledTimeFn, DisabledTimePartial } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-input-element',
  templateUrl: './input-element.component.html',
  styleUrls: ['./input-element.component.css']
})
export class InputElementComponent implements OnInit {

  @Input() InputProduct: any
  @Input() index = 0
  confirmModal?: NzModalRef;

  isVisible = false;
  isVisibleBatches = false;
  batche: any

  // addBatchsList: any[] = []

  // chọn lô
  batchesList: any
  selectBatch: any
  quantityBatch: number = 1
  selectUnitProductPrice: number = 0
  listUnitProductPrice: any
  listUnitProductPriceNew: any
  totalPrice: number = 1000
  listBatches: batchs[] = []
  /* ************************* */

  // Tạo lô mới
  manufacturingDate: string = ''
  expiryDate: string = '';

  // ************************8

  batch: batchInterface = {
    productId: 0,
    manufacturingDate: '',
    expiryDate: ''
  }

  batchs: listBatchInterface = {
    batchId: null,
    quantity: 0,
    productUnitPriceId: 0,
    totalPrice: 0,
    batch: this.batch
  }

  listProductInput$: Observable<any> | undefined
  listProductInput: ListInputProductInterface[] = []
  listBatchOfInputProduct: any[] = []

  checkBatchesempty: boolean = true

  constructor(
    private modal: NzModalService,
    private productService: ProductService,
    private notification: NzNotificationService,
    private readonly store: Store<{}>,
  ) {
  }


  today = new Date();
  tomorow: any = new Date().setDate(this.today.getDate() + 1)


  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) > 0;
  }
  disabledDateExp = (current: Date): boolean => {
    return differenceInCalendarDays(this.tomorow, current) > 0;
  }

  ngOnInit(): void {

    this.productService.getListProductUnitByProductId(this.InputProduct?.product.id).subscribe((result) => {
      this.listUnitProductPrice = result.data
      console.log(result);

      this.selectUnitProductPrice = this.listUnitProductPrice[0]?.id
    }, err => {
      this.notification.create(
        "error",
        err.error.message,
        ""
      )
    })

    this.productService.getBatchesByProductID(this.InputProduct?.product.id).subscribe((result) => {
      this.batchesList = result?.data
      this.selectBatch = this.batchesList[0]?.id
    }, err => {
      this.notification.create(
        "error",
        err.error.message,
        ""
      )
    })

    this.listProductInput$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.ListInputProduct)
    )
    this.listProductInput$.subscribe((result) => {
      this.listProductInput = result
    })

    this.listProductInput.forEach((item, index) => {
      if (item.product.id == this.InputProduct.product.id) {
        this.listBatchOfInputProduct = item.listBatch
      }
    })
  }


  getUnitProductPrice() {
    this.productService.getBatchByBatchID(this.selectBatch).subscribe((result) => {
      this.listUnitProductPrice = result.data.currentQuantity
    }, err => {
      this.notification.create(
        "error",
        err.error.message,
        ""
      )
    })
  }

  showModalBatches(): void {
    this.isVisibleBatches = true;
  }

  handleOkBatches(): void {
    this.isVisibleBatches = false;
    this.batchs = {
      batchId: this.selectBatch,
      quantity: this.quantityBatch,
      productUnitPriceId: this.selectUnitProductPrice,
      totalPrice: this.totalPrice,
      batch: null
    }

    let tempListProductInput: any[] = [...this.listProductInput]

    tempListProductInput.forEach((item: any, index: number) => {
      if (item.product.id == this.InputProduct.product.id) {
        let temp: any[] = []
        let checkExistBatch = true
        item.listBatch.forEach((batch: any, index: number) => {
          if (batch.batchId == this.batchs.batchId) {
            checkExistBatch = false
          }
        })
        if (checkExistBatch) {
          temp = item.listBatch
          temp = [...temp, this.batchs]
          tempListProductInput[index] = { ...tempListProductInput[index], listBatch: temp }
          this.store.dispatch(counterSlice.addProductToListInput(tempListProductInput))
        } else {
          this.notification.create(
            "error",
            "Lô hàng đã tồn tại",
            "Bấm vào lô hàng để chỉnh sửa hoặc chọn lô hàng khác"
          )
        }
      }
    })
  }

  handleCancelBatches(): void {
    this.isVisibleBatches = false;
  }

  showModalNewBatch(): void {
    this.isVisible = true;
  }

  checkManufacturingDate: boolean = true
  checkExpiryDate: boolean = true


  handleOkNewBatch(): void {

    if (this.manufacturingDate == '') {
      this.checkManufacturingDate = false
    } else {
      this.checkManufacturingDate = true
    }
    if (this.expiryDate == '') {
      this.checkExpiryDate = false
    } else {
      this.checkExpiryDate = true
    }
    if (this.checkExpiryDate && this.checkManufacturingDate) {
      this.batch = {
        productId: this.InputProduct.product.id,
        manufacturingDate: this.manufacturingDate,
        expiryDate: this.expiryDate
      }
      this.batchs = {
        batchId: null,
        quantity: this.quantityBatch,
        productUnitPriceId: this.selectUnitProductPrice,
        totalPrice: this.totalPrice,
        batch: this.batch
      }
      let tempListProductInput: any[] = [...this.listProductInput]
      tempListProductInput.forEach((item: any, index: number) => {
        if (item.product.id == this.InputProduct.product.id) {
          let check = true
          item.listBatch.forEach((element: any) => {
            if (element.batch != null) {
              let tempExpiry = new Date(this.expiryDate)
              let tempManufacturing = new Date(this.manufacturingDate)
              let tempBatchExp = new Date(element.batch.expiryDate)
              let temBatchManu = new Date(element.batch.manufacturingDate)

              if (tempManufacturing.getFullYear() == temBatchManu.getFullYear() && tempExpiry.getFullYear() == tempBatchExp.getFullYear()) {
                if (tempManufacturing.getMonth() == temBatchManu.getMonth() && tempExpiry.getMonth() == tempBatchExp.getMonth()) {
                  if (tempManufacturing.getDate() == temBatchManu.getDate() && tempExpiry.getDate() == tempBatchExp.getDate()) {
                    check = false
                  }
                }
              }

            }
          });

          if (check) {
            let temp: any[] = []
            temp = item.listBatch
            temp = [...temp, this.batchs]
            tempListProductInput[index] = { ...tempListProductInput[index], listBatch: temp }
            this.store.dispatch(counterSlice.addProductToListInput(tempListProductInput))
          } else {
            this.notification.create(
              "error",
              "Lô hàng đã tồn tại",
              "Bấm vào lô hàng để chỉnh sửa hoặc chọn lô hàng khác"
            )
          }
        }
      })

      this.quantityBatch = 0
      this.selectUnitProductPrice = 0
      this.totalPrice = 0
      this.manufacturingDate = ''
      this.expiryDate = ''
      this.isVisible = false;
      this.handleCancelBatches()
    }
  }

  handleCancelNewBatch(): void {
    this.isVisible = false;
  }

  deleteSelectBatches(index: number) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Xóa lô đã chọn',
      nzContent: 'Bạn muốn xóa lô thuốc này',
      nzOnOk: () => {
        let tempListProductInput: any[] = [...this.listProductInput]
        tempListProductInput.forEach((item: any, index: number) => {
          if (item.product.id == this.InputProduct.product.id) {
            let temp = [...item.listBatch]
            temp.splice(index, 1)
            tempListProductInput[index] = { ...tempListProductInput[index], listBatch: temp }
            this.store.dispatch(counterSlice.addProductToListInput(tempListProductInput))
          }
        })
      }
    });
  }

  deleteProduct() {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Xóa sản phẩm đã chọn',
      nzContent: 'Bạn muốn xóa thuốc này, khi xóa các lô của sản phẩm này cũng sẽ bị xóa',
      nzOnOk: () => {
        let tempListProductInput: any[] = [...this.listProductInput]
        tempListProductInput.forEach((item: any, index: number) => {
          if (item.product.id == this.InputProduct.product.id) {
            tempListProductInput.splice(index, 1)
          }
        })
        this.store.dispatch(counterSlice.addProductToListInput(tempListProductInput))
      }
    })
  }

}
