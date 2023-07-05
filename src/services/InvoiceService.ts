import axios from "axios";
import { INVOICE_URL } from "./baseEndpoints";
import { InvoiceData } from "../reducers/invoiceReducer";
import { InvoiceDetails } from "../interfaces/Invoice.interface";

class InvoiceService {
  async getInvoiceById(id: number): Promise<InvoiceDetails> {
    try {
      const response = await axios.get<InvoiceDetails>(`${INVOICE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`No se pudo encontrar la factura de id '${id}'`);
    }
  }

  async createInvoice(id: number, invoice: InvoiceData): Promise<void>{
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/sistemaventas/cliente/${id}/factura`, invoice);
      return response.data;
    } catch (error) {
      throw new Error("No se pudo crear la factura")
    }
  }

  async deleteInvoiceById(id: number): Promise<void> {
    try {
      const response = await axios.delete(`${INVOICE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`No se pudo eliminar la factura con id '${id}'`);
    }
  }
}

export default new InvoiceService();
