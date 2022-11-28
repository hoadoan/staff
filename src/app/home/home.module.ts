import {StoreModule} from '@ngrx/store';

import {RetailTemplateComponent} from './retail/retail-template/retail-template.component';
import {AntdModule} from './../core/antd/antd.module';
import {HomeTemplateComponent} from './home-template/home-template.component';
import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTemplateComponent} from './input/input-template/input-template.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgxPrintModule} from 'ngx-print';
import {InputElementComponent} from './input/input-element/input-element.component';
import {ProfileTemplateComponent} from './profile/profile-template/profile-template.component';
import {ProfileChagePasswordComponent} from './profile/profile-chage-password/profile-chage-password.component';
import counterReducer, {name as counterFeatureKey} from "./../core/store/store.slice";
import {InputInfoSupplierComponent} from './input/input-info-supplier/input-info-supplier.component';
import {RetailProductInBillComponent} from './retail/retail-product-in-bill/retail-product-in-bill.component';
import {RetailProductInBillBatchComponent} from './retail/retail-product-in-bill/retail-product-in-bill-batch/retail-product-in-bill-batch.component';
import {RetailCustomerInBillComponent} from './retail/retail-customer-in-bill/retail-customer-in-bill.component';
import {RetailCustomerHistoryInvoiceComponent} from './retail/retail-customer-in-bill/retail-customer-history-invoice/retail-customer-history-invoice.component';
import {RetailCustomerHistoryInvoiceDetailComponent} from './retail/retail-customer-in-bill/retail-customer-history-invoice/retail-customer-history-invoice-detail/retail-customer-history-invoice-detail.component';
import {ReturnProductTemplateComponent} from './return-product/return-product-template/return-product-template.component';
import { BrokenProductComponent } from './retail/broken-product/broken-product.component';
import { RetailInvoiceComponent } from './retail/retail-invoice/retail-invoice.component';
import {NgxBarcodeModule} from "@greatcloak/ngx-barcode";
import { ReturnProductDetailComponent } from './return-product/return-product-detail/return-product-detail.component';
import {ClickOutsideModule} from "ng-click-outside";
import { SamplePrescriptionTemplateComponent } from './sample-prescription/sample-prescription-template/sample-prescription-template.component';

const homeRoute: Routes = [
  {
    path: 'home', component: HomeTemplateComponent, children: [
      {path: '', component: RetailTemplateComponent},
      {path: 'input', component: InputTemplateComponent},
      {path: 'profile', component: ProfileTemplateComponent},
      {path: 'return', component: ReturnProductTemplateComponent},
      {path: 'sample-prescription', component: SamplePrescriptionTemplateComponent}
    ]
  }
]


@NgModule({
  declarations: [
    HomeTemplateComponent,
    RetailTemplateComponent,
    InputTemplateComponent,
    InputElementComponent,
    ProfileTemplateComponent,
    ProfileChagePasswordComponent,
    InputInfoSupplierComponent,
    RetailProductInBillComponent,
    RetailProductInBillBatchComponent,
    RetailCustomerInBillComponent,
    RetailCustomerHistoryInvoiceComponent,
    RetailCustomerHistoryInvoiceDetailComponent,
    ReturnProductTemplateComponent,
    BrokenProductComponent,
    RetailInvoiceComponent,
    ReturnProductDetailComponent,
    SamplePrescriptionTemplateComponent,


  ],
  imports: [
    NgxPrintModule,
    CommonModule,
    RouterModule.forRoot(homeRoute),
    AntdModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(counterFeatureKey, counterReducer),
    NgxBarcodeModule,
    ClickOutsideModule
  ]
})
export class HomeModule {
}
