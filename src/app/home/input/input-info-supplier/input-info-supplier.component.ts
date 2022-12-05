import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { batchs, createModelInterface, goodsReceiptNoteInterface } from './../input-element/input-element.model';
import { ProductService } from './../../../core/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { Store, createSelector } from '@ngrx/store';
import * as counterSlice from "./../../../core/store/store.slice";
import { async, Observable } from 'rxjs';
import { ListInputProductInterface } from "../../../core/store/store.model";

@Component({
  selector: 'app-input-info-supplier',
  templateUrl: './input-info-supplier.component.html',
  styleUrls: ['./input-info-supplier.component.css']
})
export class InputInfoSupplierComponent implements OnInit {

  confirmModal?: NzModalRef;


  listSuppliers: any[] = []
  totalPrice: number = 0
  selectSupplier: any = null
  isVisible = false
  goodsReceiptNote: goodsReceiptNoteInterface = {
    goodsReceiptNoteTypeId: 1,
    invoiceId: null,
    createModel: [{
      supplierId: null,
      batches: [],
      supplier: null
    }],
    isFull: true
  }
  newSupplier: string = ''

  listInputId: any[] = []
  isVisiblePrint: boolean = false

  listProductInput$: Observable<any> | undefined
  listProductInput: ListInputProductInterface[] = []

  constructor(
    private productService: ProductService,
    private store: Store<{}>,
    private notification: NzNotificationService,
    private router: Router,
    private modal: NzModalService
  ) {
  }


  ngOnInit(): void {
    this.productService.getListSuppliers().subscribe((result) => {
      this.listSuppliers = result.data
    })

    this.listProductInput$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.ListInputProduct)
    )


    this.listProductInput$.subscribe((result) => {
      this.totalPrice = 0
      this.listProductInput = result
      this.listProductInput.forEach((item: any) => {
        item.listBatch.forEach((item2: any) => {
          this.totalPrice += item2.totalPrice

          console.log(this.totalPrice)
        })
      })
    })



  }

  selectSupplierChange() {
    console.log(this.selectSupplier)
    this.goodsReceiptNote.createModel[0].supplierId = this.selectSupplier.id
    this.goodsReceiptNote.createModel[0].supplier = null
    this.newSupplier = ''

    console.log(this.goodsReceiptNote)
  }


  showModalAddSupplier(): void {
    this.isVisible = true;
  }

  handleOkSupplier(): void {
    this.selectSupplier = null

    this.isVisible = false;
    this.goodsReceiptNote.createModel[0].supplier = {
      name: this.newSupplier
    }
    this.goodsReceiptNote.createModel[0].supplierId = null
    this.selectSupplier = ''
  }

  handleCancelSupplier(): void {
    this.isVisible = false;
  }


  inputProduct() {

    console.log(this.goodsReceiptNote)

    this.confirmModal = this.modal.confirm({
      nzTitle: 'Xác nhận',
      nzOkText: 'Xác nhận',
      nzContent: 'Vui lòng xác nhận thông tin nhập hàng ',
      nzOnOk: () => {
        this.listProductInput$ = this.store.select(
          createSelector(counterSlice.selectFeature, (state) => state.ListInputProduct)
        )
        this.listProductInput$.subscribe((result) => {
          this.listProductInput = result
        })

        let tempBatches: any[] = []

        this.listProductInput.forEach((item, index) => {
          item.listBatch.forEach((item2, index) => {
            tempBatches = [...tempBatches, item2]
          })
        })

        this.goodsReceiptNote.createModel[0].batches = tempBatches

        console.log(this.goodsReceiptNote)
        if (this.goodsReceiptNote.createModel[0].batches.length <= 0) {
          this.notification.create(
            "error",
            "Chọn lô sản phẩm",
            ""
          )
        } else if (this.goodsReceiptNote.createModel[0].supplier == null && this.goodsReceiptNote == null) {
          this.notification.create(
            "error",
            "Chọn nhà cung cấp",
            ""
          )
        } else {
          this.productService.PostGoodReceiptNoteManager(this.goodsReceiptNote).subscribe((resultInput) => {
            console.log(resultInput)
            if (resultInput) {

              this.listInputId = resultInput.data
              console.log(this.listInputId);


              this.notification.create(
                'success',
                resultInput.message,
                ''
              );
              this.store.dispatch(counterSlice.resetState('ok'))
              this.isVisiblePrint = true;

            }
          }, err => {
            console.log(err.error.message)
            this.notification.create(
              'error',
              err.error.message,
              ''
            );
          })
        }
      }
    });
  }

  handleOkprint() {
    this.isVisiblePrint = false;
    document.getElementById('print__bill__data')?.click()
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  handleCancelprint() {
    this.isVisiblePrint = false;
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}

