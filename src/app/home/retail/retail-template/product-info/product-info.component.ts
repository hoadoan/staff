import { ProductService } from './../../../../core/services/product/product.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  @Input() productId: any
  productFullInfo: any

  constructor(
    private productServer: ProductService
  ) { }

  ngOnInit(): void {
    console.log(this.productId);

    this.productServer.getProductByID(this.productId).subscribe((result) => {
      console.log(result);
      this.productFullInfo = result.data
    })
  }

}
