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

  useEffect(() => {
    DashboardService.getTop5CustomersByMonth(6, 2023).then(
      (response: Top5CustomersByMonth[]) => setTop5Customers(response)
    );
  }, []);

  console.log(top5Customers);

  return (
    <div className="max-w-md">
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 448 }}>
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
            {top5Customers ? (
              top5Customers.map((customer) => (
                <TableRow key={customer.id} hover>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>
                    {customer.nombre + " " + customer.apellido}
                  </TableCell>
                  <TableCell>{formatCurrency(customer.montoTotal)}</TableCell>
                </TableRow>
              ))
            ) : (
              <Spinner />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
