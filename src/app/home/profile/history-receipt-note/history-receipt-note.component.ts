import { ProductService } from './../../../core/services/product/product.service';
import { GoodReceiptNote } from './../../../core/utils/App.interface';
import { Component, OnInit } from "@angular/core"
import { UserService } from "src/app/core/services/user/user.service"
import { PROFILE } from "src/app/core/utils/AppConfig"

@Component({
  selector: 'app-history-receipt-note',
  templateUrl: './history-receipt-note.component.html',
  styleUrls: ['./history-receipt-note.component.css']
})
export class HistoryReceiptNoteComponent implements OnInit {

  tempProfile: any = localStorage.getItem(PROFILE)
  profile: any
  listGRN: GoodReceiptNote[] = []
  listGRNNew: any[] = []
  nameList = [
      { text: 'Nhập hàng từ nhà cung cấp', value: 'Nhập hàng từ nhà cung cấp' , status: true},
      { text: 'Nhập hàng trả hóa đơn', value: 'Nhập hàng trả hóa đơn' , status: false}
    ];
    status: string = 'true'
    nameFilterFn = (list: string[], item: any): boolean => list.some(name => item.data.goodsReceiptNoteType.name.indexOf(name) !== -1);
  constructor(
    private user: UserService,
    private product: ProductService
  ) { }

  ngOnInit(): void {
    this.profile = JSON.parse(this.tempProfile)
    this.user.getProfile().subscribe((result) => {
      // console.log(result);
      this.user.getGRNByIdStaff(result.data.userId).subscribe((result)=>{
        this.listGRN = result.data
        this.listGRN.forEach(element => {
          if(element.invoiceId==null){
            this.listGRNNew.push({data: element})
          }else{
            this.product.getInvocieByInvoiceID(element.invoiceId).subscribe((invoice)=>{
              this.listGRNNew.push({data: element,name:invoice.data.customer.fullName})
            })
          }
        });
      })
    })
    console.log(this.listGRNNew)
  }

}
