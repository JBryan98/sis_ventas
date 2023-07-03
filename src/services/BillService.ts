import axios from "axios";
import { BILL_URL } from "./baseEndpoints";
import { BillDetails } from "../interfaces/Bill.interface";

class BillService {
  async getBillById(id: number): Promise<BillDetails> {
    try {
      const response = await axios.get<BillDetails>(`${BILL_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`No se pudo encontrar la factura de id '${id}'`);
    }
  }

  async deleteBillById(id: number): Promise<void> {
    try {
      const response = await axios.delete(`${BILL_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`No se pudo eliminar la factura con id '${id}'`);
    }
  }
}

export default new BillService();
