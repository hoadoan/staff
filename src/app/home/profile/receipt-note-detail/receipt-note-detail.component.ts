import { ProductService } from 'src/app/core/services/product/product.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-receipt-note-detail',
  templateUrl: './receipt-note-detail.component.html',
  styleUrls: ['./receipt-note-detail.component.css'],
})
export class ReceiptNoteDetailComponent implements OnInit {
  @Input() GRNId: number = 0
  data: any[] = []
  barcode: string = ''
  GRNtype: string = ''
  quantity: number = 0
  unit: string =''
  totalPrice: number = 0
  manufacturingDate: string = ''
  expiryDate: string = ''
  createdAt: string = ''
  note: string = ''
  visible = false;
  constructor(
    private product: ProductService
  ) {}

  ngOnInit(): void {
    this.product.getGoodsReceiptNoteById(this.GRNId).subscribe((result)=>{
      // console.log(result);
      this.data = result.data
      this.barcode = result.data.batch.barcode
      this.GRNtype = result.data.goodsReceiptNoteType.name
      this.manufacturingDate = result.data.batch.manufacturingDate
      this.expiryDate = result.data.batch.expiryDate
      this.quantity = result.data.quantity
      this.unit = result.data.unit
      this.totalPrice = result.data.totalPrice
      this.createdAt = result.data.createdAt
    })
  }

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }
}
