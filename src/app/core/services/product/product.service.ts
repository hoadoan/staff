import { DOMAIN, ACCESSTOKEN } from './../../utils/AppConfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  headers: any

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getRouteOfAdministrations(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'product-management/route-of-administrations', {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  getUnitProduct(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'product-management/units', {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  getProductByID(id: string): Observable<any> {
    return this.httpClient.get(DOMAIN + `product-management/products/${id}`, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  searchProduct(search: string): Observable<any> {
    return this.httpClient.get(DOMAIN + `product-management/products/filter?searchValue=${search}&isSale=true&pageSize=5`, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  //invoice
  retailInvoice(data: any): Observable<any> {
    return this.httpClient.post(DOMAIN + 'invoice-management/invoices', data, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  //batches
  getBatchesByProductID(id: string): Observable<any> {
    return this.httpClient.get(DOMAIN + `product-management/products/batches?productId=${id}&isSale=true`, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  getProductByBatchBarcode(barcode: string): Observable<any> {
    return this.httpClient.get(DOMAIN + `batch-management/batches/barcode?batchBarcode=${barcode}`, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  getInvetoryByUnitID(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `batch-management/unit/${id}/inventory`, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  getProductUnitbyUnitID(id: string): Observable<any> {
    return this.httpClient.get(DOMAIN + `product-units-management/product-units/${id}`, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  getBatchByBatchID(id: string): Observable<any> {
    return this.httpClient.get(DOMAIN + `batch-management/batches/${id}`, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  getListInvoicebyCustomerID(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `invoice-management/customers/${id}/invoices`, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  getInvoiceDetailByInvoiceID(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `invoice-management/invoices/${id}/invoice-detail`, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  getBatchesByBatchesID(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `product-management/products/${id}`, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  getBatchById(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `batch-management/batches/${id}`, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  getListSuppliers(): Observable<any> {
    return this.httpClient.get(DOMAIN + `suppliers-management/suppliers`, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  PostGoodReceiptNoteManager(data: any): Observable<any> {
    return this.httpClient.post(DOMAIN + 'goods-receipt-note-management/goods-receipt-notes', data, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }


  getInvocieByInvoiceID(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `invoice-management/invoices/${id}`, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }
  getDetailInvoiceByID(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `invoice-management/invoices/${id}/invoice-detail`, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  getInvocieDetailByBarcode(barcode: string): Observable<any> {
    return this.httpClient.get(DOMAIN + `invoice-management/invoices/barcode/invoice-detail?barcode=${barcode}`, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  getInvocieByBarcode(barcode: string): Observable<any> {
    return this.httpClient.get(DOMAIN + `invoice-management/invoices/barcode?barcode=${barcode}`, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  getListProductUnitByProductId(id: string): Observable<any> {
    return this.httpClient.get(DOMAIN + `product-units-management/${id}/product-units`, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  getGoodsReceiptNoteById(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `goods-receipt-note-management/goods-receipt-notes/${id}`, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  getBatchByBatchId(id: number): Observable<any> {
    return this.httpClient.get(DOMAIN + `/batch-management/batches/${id}`, {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  getPointInfomation(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'point-management/points/information', {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem(ACCESSTOKEN)!,
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    })
  }
}
