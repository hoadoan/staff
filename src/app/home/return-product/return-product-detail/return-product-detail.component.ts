import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../../core/services/product/product.service";
import {createSelector, Store} from "@ngrx/store";
import * as counterSlice from "./../../../core/store/store.slice";
import {Observable} from "rxjs";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {goodReceiptNote} from "./../../../core/store/store.slice";

@Component({
  selector: '[app-return-product-detail]',
  templateUrl: './return-product-detail.component.html',
  styleUrls: ['./return-product-detail.component.css']
})
export class ReturnProductDetailComponent implements OnInit {

  confirmModal?: NzModalRef;

  @Input() checkFull: boolean = true
  @Input() productData: any
  @Input() index: number = 0
  listUnitProduct: any[] = []
  SelectUnit: any
  quantityProduct: number = 0
  unitSelectPrice: number = 0
  batchTotalprice: number = 0

  invoiceDetailData: any
  invoiceDetailData$: Observable<any> | undefined
  goodReceiptNote: any
  goodReceiptNote$: Observable<any> | undefined


  constructor(
    private productService: ProductService,
    private store: Store<{}>,
    private modal: NzModalService
  ) {
  }

  ngOnInit(): void {

    console.log(this.productData);
    

    this.quantityProduct = this.productData?.convertedQuantity - this.productData?.returnedQuantity
    this.batchTotalprice = this.quantityProduct * this.productData?.viewBaseProductUnit.baseUnitPrice
    console.log(this.batchTotalprice, '-', this.quantityProduct,'-', this.productData?.viewBaseProductUnit.baseUnitPrice);
    


    // this.productService.getListProductUnitByProductId(this.productData.product.id).subscribe((result) => {
    //   this.listUnitProduct = result.data
    //   console.log(this.listUnitProduct[0].id)
    //   // this.listUnitProduct.forEach((item) => {
    //   //   if (item.unit == this.productData.unit) {
    //   //     this.SelectUnit = item.id
    //   //     this.unitSelectPrice = item.price
    //   //   }
    //   // })
    //
    //   // this.batchTotalprice = this.listUnitProduct[0].price * this.quantityProduct
    //   let tempgood = {...this.goodReceiptNote}
    //   console.log(tempgood)
    //   let tempBatches = [...tempgood.createModel[0]?.batches]
    //   console.log(tempBatches)
    //   let tempUnit = {...tempBatches[this.index]}
    //   console.log(tempUnit)
    //
    //   tempUnit.productUnitPriceId = this.listUnitProduct[0].id
    //
    //   tempBatches[this.index] = tempUnit
    //   let tempCreateModel = [{
    //     batches: tempBatches
    //   }]
    //   tempgood.createModel = tempCreateModel
    //   console.log(tempgood)
    //   this.goodReceiptNote = tempgood
    //   this.store.dispatch(counterSlice.goodReceiptNote(this.goodReceiptNote))
    //
    // })
    //


    this.invoiceDetailData$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.ListReturnProduct)
    )
    this.invoiceDetailData$.subscribe((result) => {
      this.invoiceDetailData = result
    })


    this.goodReceiptNote$ = this.store.select((
      createSelector(counterSlice.selectFeature, (state) => state.goodsReceiptNote)
    ))
    this.goodReceiptNote$.subscribe((result) => {
      this.goodReceiptNote = result
      console.log(this.goodReceiptNote)
      // this.quantityProduct = this.goodReceiptNote.createModel[0]?.batches[this.index]?.convertedQuantity


    })

  }


  // selectUnitPrice() {
  //   this.batchTotalprice = this.SelectUnit.price * this.quantityProduct
  //   let tempgood = {...this.goodReceiptNote}
  //   let tempBatches = [...tempgood.createModel[0].batches]
  //   let tempUnit = {...tempBatches[this.index]}
  //
  //   tempUnit.productUnitPriceId = this.SelectUnit.id
  //
  //   tempBatches[this.index] = tempUnit
  //   let tempCreateModel = [{
  //     batches: tempBatches
  //   }]
  //   tempgood.createModel = tempCreateModel
  //
  //   console.log(tempgood)
  //   this.goodReceiptNote = tempgood
  //   this.store.dispatch(counterSlice.goodReceiptNote(this.goodReceiptNote))
  // }

  changeQuantity() {
    let tempgood = {...this.goodReceiptNote}
    let tempBatches = [...tempgood.createModel[0].batches]
    let tempUnit = {...tempBatches[this.index]}

    tempUnit.quantity = this.quantityProduct
    tempUnit.totalPrice = this.quantityProduct * this.productData?.viewBaseProductUnit.baseUnitPrice

    tempBatches[this.index] = tempUnit
    let tempCreateModel = [{
      batches: tempBatches
    }]
    tempgood.createModel = tempCreateModel

    this.batchTotalprice = this.quantityProduct * this.productData?.viewBaseProductUnit.baseUnitPrice
    console.log(this.batchTotalprice, '-', this.quantityProduct,'-', this.productData?.viewBaseProductUnit.baseUnitPrice);

    console.log(tempgood)
    this.goodReceiptNote = tempgood
    this.store.dispatch(counterSlice.goodReceiptNote(this.goodReceiptNote))
  }

  changeTotalPrice() {
    let tempgood = {...this.goodReceiptNote}
    let tempBatches = [...tempgood.createModel[0].batches]
    let tempUnit = {...tempBatches[this.index]}

    tempUnit.totalPrice = this.batchTotalprice

    tempBatches[this.index] = tempUnit
    let tempCreateModel = [{
      batches: tempBatches
    }]
    tempgood.createModel = tempCreateModel

    console.log(tempgood)
    this.goodReceiptNote = tempgood
    this.store.dispatch(counterSlice.goodReceiptNote(this.goodReceiptNote))
  }


  deleteBatch() {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Xóa Lô thuốc này ra khỏi hóa đơn',
      nzContent: 'Khi xóa ra khỏi hóa đơn bạn không thể thêm lại vào danh sách',
      nzOnOk: () => {

        console.log(this.index);
        
        let temp = [...this.invoiceDetailData]

        temp.splice(this.index, 1)

        this.invoiceDetailData = [...temp]

        console.log(this.invoiceDetailData)

        let tempgood = {...this.goodReceiptNote}
        let tempBatches = [...tempgood.createModel[0].batches]
        console.log(tempBatches);
        
        tempBatches.splice(this.index, 1)
        let tempCreateModel = [{
          batches: tempBatches
        }]
        tempgood.createModel = tempCreateModel

        this.goodReceiptNote = tempgood
        this.store.dispatch(counterSlice.addListReturnProduct(this.invoiceDetailData))
        this.store.dispatch(counterSlice.goodReceiptNote(this.goodReceiptNote))
        console.log(this.goodReceiptNote)
      }
    });
  }
}
