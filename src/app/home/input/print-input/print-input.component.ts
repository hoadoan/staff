import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProductService } from './../../../core/services/product/product.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-input',
  templateUrl: './print-input.component.html',
  styleUrls: ['./print-input.component.css']
})
export class PrintInputComponent implements OnInit {

  @Input() listInputID: any[] = []
  @Input() status: boolean = true
  @Input() returnPoint: number = 0

  listInputInfo: any[] = []
  totalPriceBill: number = 0
  totalPoint: number = 0

  constructor(
    private productService: ProductService,
    private notification: NzNotificationService
  ) { }

  ngOnInit() {
    console.log(this.listInputID);
    console.log(this.returnPoint);
  
    

    if (this.listInputID.length > 0) {
      this.listInputID.forEach((item: any) => {
        this.productService.getGoodsReceiptNoteById(item?.grnId).subscribe((result: any) => {
          console.log(result.data);

          this.totalPoint = result?.data[0]?.customerPoint

          if (result?.data) {
            this.productService.getBatchById(result.data.batch.id).subscribe((product) => {
              this.listInputInfo.push({ data: result.data, productName: product.data.product.name })
              this.totalPriceBill += result.data.totalPrice
            })
          }
        }), (err: any) => {
          this.notification.create(
            'error',
            err.error.message,
            ''
          )
        }
      })
    }
  }

}


