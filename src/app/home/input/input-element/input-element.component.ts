import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Store, createSelector} from '@ngrx/store';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {goodsReceiptNoteInterface, batch, batchs} from './input-element.model';
import {ProductService} from './../../../core/services/product/product.service';
import {NzModalService, NzModalRef} from 'ng-zorro-antd/modal';
import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import * as counterSlice from "./../../../core/store/store.slice";
import {batchInterface, listBatchInterface, ListInputProductInterface} from "../../../core/store/store.model";

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
  quantityBatch: number = 0
  selectUnitProductPrice: number = 0
  listUnitProductPrice: any
  totalPrice: number = 0
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

  constructor(
    private modal: NzModalService,
    private productService: ProductService,
    private notification: NzNotificationService,
    private readonly store: Store<{}>,
  ) {
  }

  ngOnInit(): void {
    console.log(this.InputProduct);
    this.productService.getBatchesByProductID(this.InputProduct.product.id).subscribe((result) => {
      this.batchesList = result.data
      this.listUnitProductPrice = result.data[0].currentQuantity
      console.log(result.data);
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
    console.log('Button ok clicked!');
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

        console.log(item.listBatch)

        let temp: any[] = []

        let checkExistBatch = true

        item.listBatch.forEach((batch: any, index: number) => {
          if (batch.batchId == this.batchs.batchId) {
            checkExistBatch = false
          }
        })

        if (checkExistBatch) {
          console.log('ok')
          temp = item.listBatch

          temp = [...temp, this.batchs]

          tempListProductInput[index] = {...tempListProductInput[index], listBatch: temp}
          console.log(tempListProductInput)

          // console.log(this.listProductInput)
          this.store.dispatch(counterSlice.addProductToListInput(tempListProductInput))

        } else {
          this.notification.create(
            "error",
            "Lô hàng đã tồn tại",
            ""
          )
        }
      }
    })


  }

  handleCancelBatches(): void {
    console.log('Button cancel clicked!');
    this.isVisibleBatches = false;
  }

  showModalNewBatch(): void {
    this.isVisible = true;
  }

  handleOkNewBatch(): void {
    this.isVisible = false;
    this.handleCancelBatches()

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

        console.log(item.listBatch)

        let temp: any[] = []

        temp = item.listBatch

        temp = [...temp, this.batchs]

        tempListProductInput[index] = {...tempListProductInput[index], listBatch: temp}
        console.log(tempListProductInput)
        this.store.dispatch(counterSlice.addProductToListInput(tempListProductInput))
      }
    })

    this.quantityBatch = 0
    this.selectUnitProductPrice = 0
    this.totalPrice = 0
    this.manufacturingDate = ''
    this.expiryDate = ''
  }

  handleCancelNewBatch(): void {

    console.log("ok")
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
            console.log(temp)
            tempListProductInput[index] = {...tempListProductInput[index], listBatch: temp}
            console.log(tempListProductInput)
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
