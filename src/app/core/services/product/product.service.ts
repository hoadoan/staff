import { DOMAIN, ACCESSTOKEN } from './../../utils/AppConfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  token = localStorage.getItem(ACCESSTOKEN);
  headers: any;

  constructor(
    private httpClient: HttpClient
  ) {
    this.headers = new HttpHeaders({
      'authorization': this.token!,
      'accept': '*/*',
      'Access-Control-Allow-Origin': '*'
    });
  }

  getRouteOfAdministrations(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'product-management/route-of-administrations', { headers: this.headers })
  }

  getUnitProduct(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'product-management/units', { headers: this.headers })
  }

  getProductByID(id: string): Observable<any> {
    return this.httpClient.get(DOMAIN + `product-management/products/${id}`, { headers: this.headers })
  }

  searchProduct(search: string): Observable<any> {
    return this.httpClient.get(DOMAIN + `product-management/products/filter?searchValue=${search}&isSale=true&pageSize=5`, { headers: this.headers })
  }

  //invoice
  retailInvoice(data: any): Observable<any> {
    return this.httpClient.post(DOMAIN + 'invoice-management/invoices', data, { headers: this.headers })
  }

  //batches
  getBatchesByProductID(id: string): Observable<any> {
    return this.httpClient.get(DOMAIN + `product-management/products/batches?productId=${id}&isSale=true`, { headers: this.headers })
  }

  getProductByBatchBarcode(barcode: string): Observable<any> {
    return this.httpClient.get(DOMAIN + `batch-management/batches/barcode?batchBarcode=${barcode}`, { headers: this.headers })
  }

  getInvetoryByUnitID(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `batch-management/unit/${id}/inventory`, { headers: this.headers })
  }

  getProductUnitbyUnitID(id: string): Observable<any> {
    return this.httpClient.get(DOMAIN + `product-units-management/product-units/${id}`, { headers: this.headers })
  }

  getBatchByBatchID(id: string): Observable<any> {
    return this.httpClient.get(DOMAIN + `batch-management/batches/${id}`, { headers: this.headers })
  }

  getListInvoicebyCustomerID(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `invoice-management/customers/${id}/invoices`, { headers: this.headers })
  }

  getInvoiceDetailByInvoiceID(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `invoice-management/invoices/${id}/invoice-detail`, { headers: this.headers })
  }

  getBatchesByBatchesID(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `product-management/products/${id}`, { headers: this.headers })
  }

  getBatchById(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `batch-management/batches/${id}`, { headers: this.headers })
  }

  getListSuppliers(): Observable<any> {
    return this.httpClient.get(DOMAIN + `suppliers-management/suppliers`, { headers: this.headers })
  }

  PostGoodReceiptNoteManager(data: any): Observable<any> {
    return this.httpClient.post(DOMAIN + 'goods-receipt-note-management/goods-receipt-notes', data, { headers: this.headers })
  }


  getInvocieByInvoiceID(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `invoice-management/invoices/${id}`, { headers: this.headers })
  }
  getDetailInvoiceByID(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `invoice-management/invoices/${id}/invoice-detail`, { headers: this.headers })
  }

  getInvocieDetailByBarcode(barcode: string): Observable<any> {
    return this.httpClient.get(DOMAIN + `invoice-management/invoices/barcode/invoice-detail?barcode=${barcode}`, { headers: this.headers })
  }

  getInvocieByBarcode(barcode: string): Observable<any> {
    return this.httpClient.get(DOMAIN + `invoice-management/invoices/barcode?barcode=${barcode}`, { headers: this.headers })
  }

  getListProductUnitByProductId(id: string): Observable<any> {
    return this.httpClient.get(DOMAIN + `product-units-management/${id}/product-units`, { headers: this.headers })
  }

  getGoodsReceiptNoteById(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `goods-receipt-note-management/goods-receipt-notes/${id}`, { headers: this.headers })
  }

  getBatchByBatchId(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `/batch-management/batches/${id}`, { headers: this.headers })
  }

}
