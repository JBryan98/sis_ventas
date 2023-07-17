import axios from "axios";
import { CATEGORY_URL } from "./baseEndpoints";
import { Category } from "../interfaces/Product.interface";
import { ErrorResponse } from "../interfaces/Error.interface";

class CategoryService {
  async getAllCategories(): Promise<Category[]> {
    try {
      const response = await axios.get<Category[]>(CATEGORY_URL);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("No se pudieron obtener las categorias");
    }
  }

  async getCategoryById(id: number): Promise<Category> {
    try {
      const response = await axios.get<Category>(`${CATEGORY_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`No se pudo obtener la categoría con id '${id}'`);
    }
  }

  async createCategory(category: Category): Promise<Category> {
    try {
      const response = await axios.post<Category>(CATEGORY_URL, category);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo  crear la categoria");
    }
  }

  async updateCategory(id: number, category: Category) {
    try {
      const response = await axios.put<Category>(
        `${CATEGORY_URL}/${id}`,
        category
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError<ErrorResponse>(error) && error.response) {
        throw new Error(error.response.data.message.error);
      }
    }
  }

  async deleteCategoryById(id: number): Promise<void> {
    try {
      const response = await axios.delete(`${CATEGORY_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error no se pudo eliminar el producto con id '${id}'`);
    }
  }
}

export default new CategoryService();
