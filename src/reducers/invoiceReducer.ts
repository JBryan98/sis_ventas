export interface Item {
  idProducto: number;
  nombre: string;
  precioUnitario: number;
  cantidad: "" | number;
  monto: number;
  stock: "" | number;
}

export interface InvoiceData {
  idCliente: number;
  subTotal: number;
  items: Item[];
  igv: number;
  total: number;
}

export const initialState: InvoiceData = {
  idCliente: 0,
  subTotal: 0.0,
  items: [],
  igv: 0.0,
  total: 0.0,
};

const invoiceReducer = (state: InvoiceData, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_ITEM":
      console.log("ADD ITEM", payload);
      return {
        ...state,
        items: payload.items,
      };
    case "REMOVE_ITEM":
      console.log("REMOVE_ITEM", payload);
      return {
        ...state,
        items: payload.items,
      };
    case "HANDLE_ITEM_QUANTITY":
      console.log("HANDLE_ITEM_QUANTITY", payload);
      return {
        ...state,
        items: payload.items,
      };
    case "UPDATE_PRICE":
      console.log("UPDATE_PRICE", payload);
      return {
        ...state,
        subTotal: payload.subTotal,
        igv: payload.igv,
        total: payload.subTotal + payload.igv,
      };
    case "SET_CUSTOMER_ID":
      console.log("SET_CUSTOMER_ID", payload);
      return {
        ...state,
        idCliente: payload.idCliente,
      };
    default:
      return state;
  }
};

export default invoiceReducer;
