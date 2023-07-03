import axios from "axios";
import { CATEGORY_URL } from "./baseEndpoints";
import { Category } from "../interfaces/Product.interface";

class CategoryService {
  async getAllProducts(): Promise<Category[]> {
    try {
      const response = await axios.get<Category[]>(CATEGORY_URL);
      return response.data;
    } catch (error) {
      throw new Error("No se pudieron obtener los productos");
    }
  }
}

export default new CategoryService()