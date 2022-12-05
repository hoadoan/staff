import { UserService } from './../../../core/services/user/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { PROFILE } from 'src/app/core/utils/AppConfig';

@Component({
  selector: 'app-history-sell',
  templateUrl: './history-sell.component.html',
  styleUrls: ['./history-sell.component.css']
})
export class HistorySellComponent implements OnInit {

  tempProfile: any = localStorage.getItem(PROFILE)
  profile: any
  listInvoice: any[] = []
  constructor(
    private user: UserService
  ) { }

  ngOnInit(): void {
    this.profile = JSON.parse(this.tempProfile)
    this.user.getProfile().subscribe((result) => {
      // console.log(result);
      this.user.getInvoiceByIdStaff(result.data.userId).subscribe((result)=>{
        this.listInvoice = result.data
        console.log(result);
    })
    })
  }

  detailInvoice(id: number){

  }
}
