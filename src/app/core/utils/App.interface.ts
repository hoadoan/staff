export interface InvoiceInterface {
    customerId: any,
    product: Product[],
    customer: any
}
export interface Product {
    productId: number,
    goodsIssueNote: []
}

export interface GoodReceiptNote {
  id: number;
  goodsReceiptNoteType: {
    id: string;
    name: string;
  };
  batch: {
    id: number;
    barcode: string;
    manufacturingDate: string;
    expiryDate: string;
  };
  invoiceId: number;
  supplier: {
    id: number;
    name: string;
    isActive: boolean;
  };
  quantity: number;
  unit: string;
  totalPrice: number;
  convertedQuantity: number;
  baseUnitPrice: number;
  createdAt: string;
  createdBy: number
  note: [];
}
