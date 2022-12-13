import { goodsReceiptNoteInterface } from './../input-element/input-element.model';
import { Store, createSelector } from '@ngrx/store';
import { ProductService } from './../../../core/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import * as counterSlice from "./../../../core/store/store.slice";
import { Observable } from "rxjs";
import { NzNotificationService } from "ng-zorro-antd/notification";

@Component({
  selector: 'app-input-template',
  templateUrl: './input-template.component.html',
  styleUrls: ['./input-template.component.css']
})
export class InputTemplateComponent implements OnInit {

  inputValue: string = ''
  options: any[] = [];
  listProductInput$: Observable<any> | undefined
  listProductInput: any[] = []
  checkBatchesempty: boolean = true
  isVisibleUploadExcel: boolean = false

  constructor(
    private product: ProductService,
    private readonly store: Store<{}>,
    private notification: NzNotificationService,
  ) {
  }

  ngOnInit(): void {

    this.listProductInput$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.ListInputProduct)
    )
    this.listProductInput$.subscribe((result) => {
      this.listProductInput = result

      this.listProductInput.forEach((item, index) => {
        if (item.listBatch.length == 0) {
          this.checkBatchesempty = true
        } else {
          this.checkBatchesempty = false
        }
      })
    })

  }


  onInput(event: any): void {
    console.log(event);

    if (event == '') {
      event = 'a'
    }

    this.product.searchProduct(event).subscribe((result) => {
      console.log(result.items);
      this.options = result.items
    })
  }

  onSelect(event: any) {
    console.log(event);
    let checkExistProduct = true

    this.listProductInput.forEach((item, index) => {
      if (item.product.id == event.id) {
        checkExistProduct = false
      }
    })
    if (checkExistProduct) {
      this.listProductInput = [...this.listProductInput, {
        product: event,
        listBatch: []
      }]

      this.store.dispatch(counterSlice.addProductToListInput(this.listProductInput))
    } else {
      this.notification.create(
        "error",
        "Sản phẩm đã tồn tại",
        ""
      )
    }
  }

  current = 0;

  index = 'First-content';

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }


  opneModalUploadExcel() {
    this.isVisibleUploadExcel = true;
  }

  checkUploadFile: boolean = false
  fileUploadInputProduct: any = 0
  handleOkUploadExcel() {
    if (this.fileUploadInputProduct) {
      this.isVisibleUploadExcel = false;
      const reader = new FileReader();
      reader.readAsDataURL(this.fileUploadInputProduct);
      reader.onload = () => {
        console.log(reader.result);
        //gọi API chổ này      *********************************************************************************
      };
      this.fileUploadInputProduct = 0
    } else {
      this.fileUploadInputProduct = 1
    }
  }

  handleCancelUploadExcel() {
    this.isVisibleUploadExcel = false;
  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    this.fileUploadInputProduct = file
  }
}
