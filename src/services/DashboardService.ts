import axios from "axios";
import {
  DashboardCardInfo,
  Top5CustomersByMonth,
  Top5ProductsByMonth,
} from "../interfaces/Dashboard.interface";
import { DASHBOARD_URL } from "./baseEndpoints";

class DashboardService {
  async getDashboardCardInfo(): Promise<DashboardCardInfo> {
    try {
      const response = await axios.get<DashboardCardInfo>(DASHBOARD_URL);
      return response.data;
    } catch (error) {
      throw new Error("No se pudo acceder a la información");
    }
  }
  async getTop5CustomersByMonth(
    month: number,
    year: number
  ): Promise<Top5CustomersByMonth[]> {
    try {
      const response = await axios.get<Top5CustomersByMonth[]>(
        `${DASHBOARD_URL}/top5customers`,
        {
          params: {
            month: month,
            year: year,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("No se pudo acceder a la información");
    }
  }
  async getTop5ProductsByMonth(
    month: number,
    year: number
  ): Promise<Top5ProductsByMonth[]> {
    try {
      const response = await axios.get<Top5ProductsByMonth[]>(
        `${DASHBOARD_URL}/top5products`,
        {
          params: {
            month: month,
            year: year,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("No se pudo acceder a la información");
    }
  }
}

export default new DashboardService();
