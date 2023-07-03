import axios from "axios";
import { Customer } from "../interfaces/Customer.interface";
import { CUSTOMER_URL } from "./baseEndpoints";

class CustomerService {
  async getAllCustomers(): Promise<Customer[]> {
    try {
      const response = await axios.get<Customer[]>(CUSTOMER_URL);
      return response.data;
    } catch (error) {
      throw new Error("No se pudieron obtener los clientes");
    }
  }

  async getCustomerById(id: number): Promise<Customer> {
    try {
      const response = await axios.get<Customer>(`${CUSTOMER_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`No se pudo obtener el cliente con id '${id}'`);
    }
  }

  async createCustomer(customer: Customer): Promise<Customer> {
    try {
      const response = await axios.post<Customer>(CUSTOMER_URL, customer);
      return response.data;
    } catch (error) {
      throw new Error("No se pudo crear el cliente");
    }
  }

  async updateCustomerById(id: number, customer: Customer): Promise<Customer> {
    try {
      const response = await axios.put<Customer>(
        `${CUSTOMER_URL}/${id}`,
        customer
      );
      return response.data;
    } catch (error) {
      throw new Error(`No se pudo actualizar el cliente con id '${id}`);
    }
  }

  async deleteCustomerById(id: number): Promise<void> {
    try {
      const response = await axios.delete(`${CUSTOMER_URL}/${id}`);
      return response.data;
    } catch (error) {
        throw new Error(`No se pudo eliminar el cliente con id '${id}`);
    }
  }
}

export default new CustomerService();
