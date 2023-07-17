import {
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TableBody,
  Table,
} from "@mui/material";
import { useState, useEffect } from "react";
import DashboardService from "../services/DashboardService";
import { Top5CustomersByMonth } from "../interfaces/Dashboard.interface";
import { formatCurrency } from "../utils/formatCurrency";
import { Spinner } from "./Spinner";

export const Top5Customers = (): JSX.Element => {
  const [top5Customers, setTop5Customers] = useState<
    Top5CustomersByMonth[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    DashboardService.getTop5CustomersByMonth(6, 2023)
      .then((response: Top5CustomersByMonth[]) => {
        setTop5Customers(response);
        setError(false);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="max-w-md">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 448 }}>
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={3}
                sx={{ backgroundColor: "#262626", color: "#fff" }}
              >
                <Typography variant="button">Top 5 clientes del mes</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="button">Id</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="button">Cliente</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="button">Total de compras</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Error al obtener los datos
                </TableCell>
              </TableRow>
            ) : (
              top5Customers?.map((customer) => (
                <TableRow key={customer.id} hover>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>
                    {customer.nombre + " " + customer.apellido}
                  </TableCell>
                  <TableCell>{formatCurrency(customer.montoTotal)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
