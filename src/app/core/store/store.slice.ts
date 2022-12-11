import { createSlice, current } from "@reduxjs/toolkit";
import { createFeatureSelector } from "@ngrx/store";
import { invoiceInterface } from "src/app/home/retail/retail.model";
import { goodsReceiptNoteInterface, ListInputProductInterface, productinbillInterface } from "./store.model";

const counterSlice = createSlice({

  name: "counter",
  initialState: {
    ListBrokenProduct: [] as any,
    ListProductInbill: [] as productinbillInterface[],
    ListInputProduct: [] as ListInputProductInterface[],
    listGoodsReceiptNote: [] as any,
    invoice: {
      goodsIssueNoteTypeId: 1,
      usePoint: 0,
      customerId: null,
      product: [] as any,
      customer: null
    } as invoiceInterface,
    invoiceID: '',
    ListReturnProduct: [] as any,
    goodsReceiptNote: {
      goodsReceiptNoteTypeId: 2,
      createModel: [{
        batches: []
      }] as any,
      invoiceId: 0,
      isFull: true
    }
  },
  reducers: {
    goodReceiptNote: (state, action) => {
      state.goodsReceiptNote = action.payload
      console.log(action.payload)
    },
    addListReturnProduct: (state, action) => {
      state.ListReturnProduct = action.payload
      console.log(state.ListReturnProduct)
    },
    addInvoiceID: (state, action) => {
      state.invoiceID = action.payload
      console.log(state.invoiceID);

    },
    resetState: (state, action) => {
      state.ListBrokenProduct = [],
        state.ListProductInbill = [],
        state.ListInputProduct = [],
        state.listGoodsReceiptNote = [],
        state.invoice = {
          goodsIssueNoteTypeId: 1,
          usePoint: 0,
          customerId: null,
          product: [] as any,
          customer: null
        }
      state.invoiceID = '',
        state.ListReturnProduct = []
      state.goodsReceiptNote = {
        goodsReceiptNoteTypeId: 2,
        createModel: [{
          batches: []
        }],
        invoiceId: 0,
        isFull: true
      }
    },
    deleteBacthProductInBill: (state, action) => {
      console.log(action.payload)
      let tempListProductInBill = [...current(state.ListProductInbill)]

      tempListProductInBill.forEach((item, index) => {
        if (item.product.id === action.payload.product.id) {
          let tempGoogissueNote = tempListProductInBill[index].listBatches.filter(item => item.batchId !== action.payload.id)

          tempListProductInBill[index] = { ...tempListProductInBill[index], listBatches: tempGoogissueNote }
          console.log(tempListProductInBill)
          state.ListProductInbill = [...tempListProductInBill]
          console.log(state.ListProductInbill)
        }
      })
    },
    addProducttoListBill: (state, action) => {
      console.log(action.payload)

      let check = true

      state.ListProductInbill.forEach((item) => {
        if (item.product.id == action.payload.product.id) {
          check = false
        }
      })

      if (check) {
        state.ListProductInbill = [...state.ListProductInbill, action.payload]
        console.log(state.ListProductInbill);
        let invocieTemp = { ...state.invoice }
        let productTemp: any[] = state.invoice.product
        for (let i = 0; i < state.ListProductInbill.length; i++) {
          if (state.ListProductInbill[i].product.id == action.payload.id) {
            productTemp = [...productTemp, {
              productId: action.payload.id,
              use: action.payload.use,
              goodsIssueNote: [{
                quantity: 1,
                unit: state.ListProductInbill[i].product.productUnits[0].id,
                batchId: state.ListProductInbill[i].product.batches[0].id
              }]
            }]
          }
        }

        console.log(productTemp);

        invocieTemp.product = productTemp
        state.invoice = { ...invocieTemp }
        console.log(state.invoice);
      } else {
        console.log("Tồn tại")
      }


    }, addBatchesToProductinBill: (state, action) => {
      console.log(action.payload)
      let tempListProductInBill = [...current(state.ListProductInbill)]

      tempListProductInBill.forEach((element, index) => {
        if (element.product.id === action.payload.product.id) {
          tempListProductInBill[index] = action.payload
        }
      })
      state.ListProductInbill = tempListProductInBill
      console.log(state.ListProductInbill)
    }, deleteProductInBill: (state, action) => {
      let tempListInBill = current(state.ListProductInbill)
      console.log(tempListInBill);
      tempListInBill.forEach((element, index) => {
        if (element.product.id == action.payload) {
          let a = tempListInBill.filter(item => item.product.id != action.payload)
          tempListInBill = [...a]
        }
      });
      state.ListProductInbill = [...tempListInBill]
      let temInvocie = current(state.invoice)
      let temProductInvoice = temInvocie.product
      temProductInvoice.forEach((element, index) => {
        if (element.productId == action.payload) {
          let a = temProductInvoice.filter(item => item.productId != action.payload)
          temProductInvoice = [...a]
          temInvocie = { ...temInvocie, product: temProductInvoice }
        }
      });
      state.invoice = { ...temInvocie }
    }, addCustomer: (state, action) => {
      state.invoice = action.payload
    },
    addProductToListInput: (state, action) => {
      state.ListInputProduct = action.payload
      console.log(state.ListInputProduct)
    },
    addgoodsReceiptNote: (state, action) => {
      state.listGoodsReceiptNote = action.payload
      console.log(state.listGoodsReceiptNote);
    },
  }
});

const {
  reducer,
  actions: {
    addProducttoListBill,
    addProductToListInput,
    addgoodsReceiptNote,
    addBatchesToProductinBill,
    addCustomer,
    deleteProductInBill,
    deleteBacthProductInBill,
    resetState,
    addInvoiceID,
    addListReturnProduct,
    goodReceiptNote,

  },
  name
} = counterSlice;

export default counterSlice.reducer;
export {
  name,
  addProducttoListBill,
  addProductToListInput,
  addgoodsReceiptNote,
  addBatchesToProductinBill,
  addCustomer,
  deleteProductInBill,
  deleteBacthProductInBill,
  resetState,
  addInvoiceID,
  addListReturnProduct,
  goodReceiptNote,
};

export const selectFeature = createFeatureSelector<ReturnType<typeof reducer>>(
  name
);
