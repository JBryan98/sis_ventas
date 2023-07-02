import axios from "axios";
import { PRODUCT_URL } from "./baseEndpoints";
import { Product } from "../interfaces/Product.interface";

class ProductoService {
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await axios.get<Product[]>(PRODUCT_URL);
      return response.data;
    } catch (error) {
      throw new Error("No se pudieron obtener los productos");
    }
  }

  async getProductById(id: number): Promise<Product> {
    try {
      const response = await axios.get<Product>(`${PRODUCT_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`No se pudo obtener el producto con id '${id}'`);
    }
  }

  async createProduct(product: Product): Promise<Product> {
    try {
      const response = await axios.post<Product>(`${PRODUCT_URL}`, product);
      return response.data;
    } catch (error) {
      throw new Error(`No se pudo crear el producto`);
    }
  }

  async updateProduct(id: number, product: Product): Promise<Product> {
    try {
      const response = await axios.put<Product>(`${PRODUCT_URL}/${id}`,product);
      return response.data;
    } catch (error) {
      throw new Error(`No se pudo actualizar el producto con id '${id}'`);
    }
  }

  //   updateProductPrice(id: number, price: number) {
  //     return axios.patch(`${PRODUCT_URL}/${id}/precio`, price);
  //   }

  //   updateProductStock(id: number, stock: number) {
  //     return axios.patch(`${PRODUCT_URL}/${id}/stock`, stock);
  //   }

  async deleteProductById(id: number): Promise<void> {
    try {
      const response = await axios.delete(`${PRODUCT_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`No se pudo eliminar el producto con id '${id}'`);
    }
  }
}

export default new ProductoService();
