import {goodsReceiptNoteInterface} from './../input-element/input-element.model';
import {Store, createSelector} from '@ngrx/store';
import {ProductService} from './../../../core/services/product/product.service';
import {Component, OnInit} from '@angular/core';
import * as counterSlice from "./../../../core/store/store.slice";
import {Observable} from "rxjs";
import {NzNotificationService} from "ng-zorro-antd/notification";

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

  constructor(
    private product: ProductService,
    private readonly store: Store<{}>,
    private notification: NzNotificationService
  ) {
  }

  ngOnInit(): void {

    this.listProductInput$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.ListInputProduct)
    )
    this.listProductInput$.subscribe((result) => {
      this.listProductInput = result
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
}
