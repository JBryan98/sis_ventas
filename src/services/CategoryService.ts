import axios from "axios";
import { CATEGORY_URL } from "./baseEndpoints";
import { Category } from "../interfaces/Product.interface";

class CategoryService {
  async getAllCategories(): Promise<Category[]> {
    try {
      const response = await axios.get<Category[]>(CATEGORY_URL);
      return response.data;
    } catch (error) {
      throw new Error("No se pudieron obtener los productos");
    }
  }

  async deleteCategoryById(id: number): Promise<void> {
    try {
      const response = await axios.delete(`${CATEGORY_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error no se pudo eliminar el producto con id '${id}'`)
    }
  }
}

export default new CategoryService()