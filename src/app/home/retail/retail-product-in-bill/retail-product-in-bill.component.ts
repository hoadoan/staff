import {Component, Input, OnInit} from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {Store} from "@ngrx/store";
import * as counterSlice from "./../../../core/store/store.slice";
import {goodsIssueNote} from "../retail.model";
import {NzNotificationService} from "ng-zorro-antd/notification";


@Component({
  selector: 'app-retail-product-in-bill',
  templateUrl: './retail-product-in-bill.component.html',
  styleUrls: ['./retail-product-in-bill.component.css']
})
export class RetailProductInBillComponent implements OnInit {


  @Input() productInbill: any
  @Input() index: number = 0
  confirmModal?: NzModalRef

// batches
  isVisibleAddBatch: boolean = false
  ListBatchesOfProductInBill: any[] = [] // danh sách lô hàng của sản phẩm được chọn
  ListUnitOfBatches: any[] = [] // danh sách đơn vị của lô hàng được chọn
  MaxBatchQuantity: number = 0

  goodsIssueNote: goodsIssueNote = {
    quantity: 1,
    unit: 0,
    batchId: 0
  }


  noteInput: string = ''

  constructor(
    private modal: NzModalService,
    private store: Store<{}>,
    private notification: NzNotificationService
  ) {
  }

  ngOnInit(): void {
    if (this.productInbill.listBatches.length == 0) {
      this.isVisibleAddBatch = true
    }

    // danh sách lô hàng của sản phẩm
    this.ListBatchesOfProductInBill = this.productInbill.product.batches
    this.goodsIssueNote.batchId = this.ListBatchesOfProductInBill[0].id
    if (this.goodsIssueNote.batchId != 0) {
      for (let i = 0; i < this.ListBatchesOfProductInBill.length; i++) {
        if (this.ListBatchesOfProductInBill[i].id == this.goodsIssueNote.batchId) {
          this.ListUnitOfBatches = this.ListBatchesOfProductInBill[i].currentQuantity
          this.goodsIssueNote.unit = this.ListUnitOfBatches[0].id
          for (let i = 0; i < this.ListUnitOfBatches.length; i++) {
            if (this.ListUnitOfBatches[i].id == this.goodsIssueNote.unit) {
              this.MaxBatchQuantity = this.ListUnitOfBatches[i].currentQuantity
            }
          }
        }
      }
    }
  }

  selectBatchIDChanged() {
    if (this.goodsIssueNote.batchId != 0) {
      for (let i = 0; i < this.ListBatchesOfProductInBill.length; i++) {
        if (this.ListBatchesOfProductInBill[i].id == this.goodsIssueNote.batchId) {
          this.ListUnitOfBatches = this.ListBatchesOfProductInBill[i].currentQuantity
          this.goodsIssueNote.unit = this.ListUnitOfBatches[0].id
        }
      }
    }
  }

  changeUnit() {
    for (let i = 0; i < this.ListUnitOfBatches.length; i++) {
      if (this.ListUnitOfBatches[i].id == this.goodsIssueNote.unit) {
        this.MaxBatchQuantity = this.ListUnitOfBatches[i].quantity
      }
    }
  }


  showConfirmDeleteProductInBill() {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Bạn có muốn xóa sản phẩm này?',
      nzContent: 'khi bấm vào nút ok sản phẩm sẽ được xóa khỏi danh sách',
      nzOnOk: () => {
        this.store.dispatch(counterSlice.deleteProductInBill(this.productInbill.product.id))
      }
    });
  }


  handleOkAddBatch() {
    this.isVisibleAddBatch = false
    console.log(this.goodsIssueNote)
    let checkExistbatch = true
    let tempListbatches = [...this.productInbill.listBatches]

    this.productInbill.listBatches.forEach((element: any, index: number) => {
      if (element.batchId === this.goodsIssueNote.batchId) {
        checkExistbatch = false
      }
    })

    if (checkExistbatch) {
      console.log(checkExistbatch)
      tempListbatches = [...this.productInbill.listBatches, this.goodsIssueNote]
    } else {
      this.notification.create(
        'error',
        'Lô đã tồn tại',
        'Vui lòng chọn lô khác'
      )
    }


    this.store.dispatch(counterSlice.addBatchesToProductinBill({
      product: this.productInbill.product,
      listBatches: tempListbatches
    }))

  }

  showAddBatchModal() {
    this.isVisibleAddBatch = true
  }

  handleCancelAddbatch() {
    this.isVisibleAddBatch = false
  }

}
