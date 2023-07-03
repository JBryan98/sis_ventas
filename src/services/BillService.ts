import axios from "axios";
import { BILL_URL } from "./baseEndpoints";

class BillService {
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
