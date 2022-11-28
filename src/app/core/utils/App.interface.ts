export interface InvoiceInterface {
    customerId: any,
    product: Product[],
    customer: any
}
export interface Product {
    productId: number,
    goodsIssueNote: []
}