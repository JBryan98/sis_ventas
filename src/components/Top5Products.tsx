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
import { Top5ProductsByMonth } from "../interfaces/Dashboard.interface";
import { Spinner } from "./Spinner";

export const Top5Products = (): JSX.Element => {
  const [top5Products, setTop5Products] = useState<
    Top5ProductsByMonth[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    DashboardService.getTop5ProductsByMonth(6, 2023)
      .then((response: Top5ProductsByMonth[]) => {
        setTop5Products(response);
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="max-w-2xl">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 672 }}>
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={3}
                sx={{ backgroundColor: "#262626", color: "#fff" }}
              >
                <Typography variant="button">
                  Top 5 productos del mes
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="button">Id</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="button">Producto</Typography>
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
              top5Products?.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.nombre}</TableCell>
                  <TableCell align="center">{product.cantidadTotal}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
