import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product/product.service';
import { InvoiceDetail } from 'src/app/core/utils/App.interface';

@Component({
  selector: 'app-sell-detail',
  templateUrl: './sell-detail.component.html',
  styleUrls: ['./sell-detail.component.css'],
})
export class SellDetailComponent implements OnInit {
  @Input() invoiceId: number = 0;
  @Input() barcode: string = '';
  invoiceDetails: InvoiceDetail[] = [];
  quantity: number = 0;
  unit: string = '';
  unitPrice: number = 0;
  convertedQuantity: number = 0;
  totalPrice: number = 0;
  customerName: string = '';
  staffName: string = '';
  customerPhone: string = '';
  discount: string = '';
  createdAt: string = '';
  visible = false;
  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.getInvocieByInvoiceID(this.invoiceId).subscribe((result) => {
      this.quantity = result.data.quantity;
      this.unit = result.data.unit;
      this.unitPrice = result.data.unitPrice;
      this.convertedQuantity = result.data.convertedQuantity;
      this.customerName = result.data.customer.fullName;
      this.staffName = result.data.createdBy.name;
      this.customerPhone = result.data.customer.phoneNumber;
      this.discount = result.data.discount;
      this.createdAt = result.data.createdAt;
    })
    this.product.getDetailInvoiceByID(this.invoiceId).subscribe((result) => {
      this.invoiceDetails = result.data
      this.invoiceDetails.forEach(element => {
        this.totalPrice += (element.quantity*element.unitPrice)
      });
    });
  }
  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }
}
