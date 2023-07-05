import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FaUserAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { InvoiceDetails } from "../interfaces/Invoice.interface";
import { formatCurrency } from "../utils/formatCurrency";
import { Spinner } from "./Spinner";
import InvoiceService from "../services/InvoiceService";

export const CustomerInvoiceDetails = (): JSX.Element => {
  const { customerId, invoiceId } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<InvoiceDetails | null>(null);

  useEffect(() => {
    InvoiceService.getInvoiceById(Number(invoiceId)).then((response: InvoiceDetails) =>
    setInvoice(response)
    );
  }, [invoiceId]);

  return (
    <div>
      <Container fixed sx={{ paddingTop: 5 }}>
        <Card>
          <CardHeader
            title={`Detalle de factura ${invoiceId}`}
            sx={{
              backgroundColor: "#212121",
              color: "#fff",
            }}
            action={
              <Button
                variant="contained"
                onClick={() => navigate(`/clientes/${customerId}/facturas`)}
              >
                Volver
              </Button>
            }
          />
          <hr />
          {invoice ? (
            <>
              <CardContent>
                <Typography variant="button" display="block" gutterBottom>
                  <FaUserAlt className="inline-block align-baseline text-sm" />
                  {" " + invoice.cliente?.nombre + " " + invoice.cliente?.apellido}
                </Typography>
                <Typography variant="button" display="block" gutterBottom>
                  <FaPhoneAlt className="inline-block mb-1 text-sm" />
                  {" " + invoice.cliente?.telefono}
                </Typography>
                <Typography variant="button" gutterBottom>
                  <MdEmail className="inline-block text-base mb-1" />
                  {" " + invoice.cliente?.email}
                </Typography>
              </CardContent>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="button">Producto</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="button">Precio c/u</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="button">Cantidad</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="button">Subtotal</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoice.items.map((item) => (
                      <TableRow key={item.id} hover>
                        <TableCell>{item.producto.nombre}</TableCell>
                        <TableCell>
                          {formatCurrency(item.producto.precio)}
                        </TableCell>
                        <TableCell>{item.cantidad}</TableCell>
                        <TableCell>
                          {formatCurrency(item.producto.precio * item.cantidad)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell rowSpan={3} colSpan={1} />
                      <TableCell colSpan={2} align="center">
                        <Typography variant="button">Subtotal</Typography>{" "}
                      </TableCell>
                      <TableCell>{formatCurrency(invoice.subTotal)}</TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell colSpan={2} align="center">
                        <Typography variant="button">IGV 18%</Typography>{" "}
                      </TableCell>
                      <TableCell>{formatCurrency(invoice.igv)}</TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell colSpan={2} align="center">
                        <Typography variant="button">Total</Typography>{" "}
                      </TableCell>
                      <TableCell>{formatCurrency(invoice.total)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <Spinner />
          )}
        </Card>
      </Container>
    </div>
  );
};
