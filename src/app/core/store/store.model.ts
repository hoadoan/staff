import {supplier} from "../../home/input/input-element/input-element.model";

export interface productinbillInterface {
  product: any,
  listBatches: goodsIssueNoteInterface[]
}

export interface goodsIssueNoteInterface {
  goodsIssueNoteTypeId: number,
  quantity: number,
  unit: number,
  batchId: number
}


export interface batchInterface {
  productId: number,
  manufacturingDate: string,
  expiryDate: string
}

export interface listBatchInterface {
  batchId: number | null,
  quantity: number | null,
  productUnitPriceId: number | null,
  totalPrice: number | null,
  batch: batchInterface | null
}

export interface ListInputProductInterface {
  product: any,
  listBatch: listBatchInterface[]
}


export interface createModelInterface {
  batches: listBatchInterface[] | null,
}

export interface goodsReceiptNoteInterface {
  goodsReceiptNoteTypeId: number,
  createModel: any[],
  invoiceId: number,
  isFull: boolean
}
