import { ProductService } from 'src/app/core/services/product/product.service';
import { Component, OnInit, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-report-broken-product',
  templateUrl: './report-broken-product.component.html',
  styleUrls: ['./report-broken-product.component.css']
})
export class ReportBrokenProductComponent implements OnInit {

  @Input() BrokenId: number = 0
  listInputInfo: any[] = []
  invoiceInfo: any
  invoiceId: number = 0

  constructor(
    private productService: ProductService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    console.log(this.BrokenId);

    this.productService.getInvocieByInvoiceID(this.BrokenId).subscribe((result) => {
      this.invoiceInfo = result.data
      console.log(this.invoiceInfo);

      this.productService.getInvoiceDetailByInvoiceID(this.invoiceInfo.id).subscribe((reuslt) => {
        this.listInputInfo = reuslt.data
      }, err => {
        this.notification.create(
          "error",
          err.error.message,
          ""
        )
      })
    }, err => {
      this.notification.create(
        "error",
        err.error.message,
        ""
      )
    })

  }

}
