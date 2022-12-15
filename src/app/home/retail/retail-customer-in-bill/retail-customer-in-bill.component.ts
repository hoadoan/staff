import { Observable } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { UserService } from './../../../core/services/user/user.service';
import { ProductService } from './../../../core/services/product/product.service';
import { Component, Input, OnInit } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as counterSlice from "./../../../core/store/store.slice";
import { POINTCONVERT } from "../../../core/utils/AppConfig";

@Component({
  selector: 'app-retail-customer-in-bill',
  templateUrl: './retail-customer-in-bill.component.html',
  styleUrls: ['./retail-customer-in-bill.component.css']
})
export class RetailCustomerInBillComponent implements OnInit {

  // @ViewChild('printBtn') printBtn: ElementRef<HTMLElement> | undefined;

  invoiceID: number = 0

  // danh sách sản phẩm
  listProductInBill$: Observable<any> | undefined // lấy từ kho lưu trữ (store.slice.ts)
  listProductInBill: any[] = [] // lưu thông tin lấy từ kho lưu trữ (listProductInBill$)
  invocie$: Observable<any> | undefined
  invoice: any
  selectedValue: any = ''
  phoneNumber: string = ''
  customerName: string = ''
  listCustomer: any[] = []
  customerInfo: any = null
  @Input() totalBill: any
  @Input() TotalProductInBill: any[] = []
  @Input() InvoiceProduct: any[] = []
  isSpinning: boolean = true
  reciveMoney: number = 0
  isVisibleNewCustomer = false;
  printBill: any
  isVisibleHistoryInvoice = false
  confirmModal?: NzModalRef;
  rewardPoint: number = 0
  pointConvert: number = 1000
  usePoint: number = 0


  // invoiceRedux$: Observable<any> | undefined
  // invoiceRedux: any
  totalBillPrice: number = 0


  constructor(
    private user: UserService,
    private productservice: ProductService,
    private router: Router,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private store: Store<{}>
  ) {
  }

  ngOnInit(): void {

    this.listProductInBill$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.ListProductInbill)

    )
    this.listProductInBill$.subscribe((result) => {
      this.listProductInBill = result
      this.isVisibleHistoryInvoice = false
      if (this.listProductInBill.length > 0) {
        this.totalBillPrice = 0
        this.listProductInBill.forEach((element) => {
          element.listBatches.forEach((batch: any) => {
            this.productservice.getProductUnitbyUnitID(batch.unit).subscribe((result) => {
              this.totalBillPrice += (batch.quantity * result.data.price)
            }, err => {
              this.notification.create(
                "error",
                err.error.message,
                ""
              )
            })
          })
        })
      }
    })

    this.invocie$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.invoice)
    )
    this.invocie$.subscribe((result) => {
      this.invoice = result
    })

  }

  showInvoiceHistory() {
    this.isVisibleHistoryInvoice = true
  }

  handleOkInvoiceHistory(): void {
    this.isVisibleHistoryInvoice = false;
  }

  handleCancelInvoiceHistory(): void {
    this.isVisibleHistoryInvoice = false;
  }

  createInvoice() {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Bán hàng',
      nzContent: 'Vui lòng xác nhận thông tin hóa đơn trước khi bán hàng',
      nzOkText: 'Xác nhận',
      nzOnOk: () => {

        this.listProductInBill$ = this.store.select(
          createSelector(counterSlice.selectFeature, (state) => state.ListProductInbill)
        )
        this.listProductInBill$.subscribe((result) => {
          this.listProductInBill = result
        })

        this.invocie$ = this.store.select(
          createSelector(counterSlice.selectFeature, (state) => state.invoice)
        )
        this.invocie$.subscribe((result) => {
          this.invoice = result
        })

        let tempproduct = [...this.invoice.product]

        this.listProductInBill.forEach((element, index) => {
          tempproduct.push({
            productId: element.product.id,
            use: element.use,
            goodsIssueNote: element.listBatches
          })
        })

        this.invoice = { ...this.invoice, product: tempproduct }

        if (this.invoice.product.length <= 0) {
          this.notification.create(
            "error",
            'Thiếu thông tin thuốc',
            "Vui lòng chọn thuốc cần bán"
          )
        } else {
          console.log(this.invoice)
          this.productservice.retailInvoice(this.invoice).subscribe((result) => {
            if (result) {
              this.invoiceID = result.data.invoiceId

              console.log("ok")
              if (this.invoiceID != 0) {
                this.notification.create(
                  "success",
                  "Tạo hóa đơn thành công",
                  ""
                )
                this.store.dispatch(counterSlice.resetState('ok'))
              }
            }
            this.isVisibleInvoicePrint = true
          }, err => {
            console.log(err)
            this.notification.create(
              "error",
              err.error.message,
              ""
            )
          })
        }
      }
      ,
    });

  }

  searchcustomer(value: string) {
    if (value == '') {
      value = '0'
    }
    this.user.getListCustomerSearch(value).subscribe((result) => {
      this.listCustomer = result.items
      if (this.listCustomer.length == 0) {
        this.phoneNumber = value
      }
    }, err => {
      this.notification.create(
        "error",
        err.error.message,
        ""
      )
    })
  }

  usePoineChange() {
    this.invoice = { ...this.invoice, usePoint: this.usePoint }
    console.log(this.invoice)
    this.store.dispatch(counterSlice.addCustomer(this.invoice))

  }

  addcustomer() {
    this.phoneNumber = this.selectedValue.phoneNumber
    this.customerName = this.selectedValue.fullName
    this.customerInfo = this.selectedValue

    console.log(this.selectedValue)

    this.user.getCustomerByID(this.selectedValue.id).subscribe((result) => {
      this.rewardPoint = result.data.totalPoint
    })

    this.invoice = { ...this.invoice, customerId: this.customerInfo.id, customer: null }

    console.log(this.invoice)

    this.store.dispatch(counterSlice.addCustomer(this.invoice))

  }

  inputValue?: string;
  options: string[] = [];

  onInput(event: Event):
    void {
    const value = (event.target as HTMLInputElement).value;
    this.options = value ? [value, value + value, value + value + value] : [];
  }

  addReciveMoney(money: number) {
    this.reciveMoney = money
  }

  showModalAddNewCustomer(): void {
    this.isVisibleNewCustomer = true;
  }

  handleOkAddNewCustomer(): void {

    this.isVisibleNewCustomer = false;

    this.invoice = {
      ...this.invoice, customerId: null, customer: {
        phoneNumber: this.phoneNumber,
        fullName: this.customerName
      }
    }
    this.store.dispatch(counterSlice.addCustomer(this.invoice))

  }

  handleCancelAddNewCustomer(): void {
    this.isVisibleNewCustomer = false;
    this.phoneNumber = ''
    this.customerName = ''
  }


  isVisibleInvoicePrint: boolean = false;
  handleCancelInvoicePrint() {

    if (this.invoiceID != 0) {
      this.isVisibleInvoicePrint = false;
      this.store.dispatch(counterSlice.resetState('ok'))
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
    }

  }
  handleOkInvoicePrint() {


    if (this.invoiceID != 0) {
      this.isVisibleInvoicePrint = false;
      document.getElementById('print__bill__data__sale')?.click()
      this.store.dispatch(counterSlice.resetState('ok'))
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
    }
  }

  checkPhoneNumberFormat: boolean = true
  CheckPhoneNumberCustomer() {
    var validRegex = /^0[0-9]{9}$/g
    // if (this.phoneNumber != '') {
      if (this.phoneNumber.match(validRegex)) {
        this.checkPhoneNumberFormat = true
      } else {
        this.checkPhoneNumberFormat = false
      }
    // } else {
    //   this.checkPhoneNumberFormat = false
    // }
  }

}
