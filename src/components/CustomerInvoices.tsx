import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "../hooks/useAlert";
import CustomerService from "../services/CustomerService";
import { Customer } from "../interfaces/Customer.interface";
import InvoiceService from "../services/InvoiceService";
import MUIDataTable, { MUIDataTableData, MUIDataTableMeta } from "mui-datatables";
import { customerInvoicesTableColumn } from "../utils/mui-datatable-columns/customerInvoicesTableColumns";
import { options } from "../utils/muiDatatableOptions";
import { formatCurrency } from "../utils/formatCurrency";
import DeleteAlert from "./DeleteAlert";
import { Spinner } from "./Spinner";

export const CustomerInvoices = (): JSX.Element => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const { isOpen, handleOpen, handleClose } = useAlert();
  const [invoiceId, setInvoiceId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    CustomerService.getCustomerById(Number(customerId)).then(
      (response: Customer) => setCustomer(response)
    );
  }, [customerId]);

  const deleteInvoiceById = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.preventDefault();
    InvoiceService.deleteInvoiceById(id).then(() => {
      if (customer) {
        const invoicesUpdated = customer.facturas?.filter(
          (factura) => factura.id !== id
        );
        setCustomer({ ...customer, facturas: invoicesUpdated });
      }
    });
  };

  const actionsColumn = {
    name: "acciones",
    label: "ACCIONES",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (
        _value: MUIDataTableData,
        tableMeta: MUIDataTableMeta
      ): JSX.Element => {
        const facturaId =
          customer?.facturas && customer.facturas[tableMeta.rowIndex].id;
        return (
          <>
            {facturaId && (
              <div>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() =>
                    navigate(`/clientes/${customerId}/factura/${facturaId}`)
                  }
                  size="small"
                  sx={{ marginRight: 1 }}
                >
                  Ver Factura
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    handleOpen();
                    setInvoiceId(facturaId);
                  }}
                  size="small"
                >
                  Eliminar Factura
                </Button>
              </div>
            )}
          </>
        );
      },
    },
  };

  return (
    <div>
      <Container fixed sx={{ paddingTop: 5 }}>
        <Card>
          <CardHeader
            title="Información del Cliente"
            sx={{
              backgroundColor: "#212121",
              color: "#fff",
            }}
            action={
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    navigate(`/clientes/${customerId}/crear-factura`)
                  }
                  sx={{ marginRight: 1 }}
                >
                  Crear Factura
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate("/clientes")}
                >
                  Volver
                </Button>
              </>
            }
          />
          <hr />
          {customer ? (
            <>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  Nombre Completo:
                </Typography>
                <Typography variant="overline" gutterBottom>
                  {customer.nombre + " " + customer.apellido}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Email:
                </Typography>
                <Typography variant="overline" gutterBottom>
                  {customer.email}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Teléfono:
                </Typography>
                <Typography variant="overline" gutterBottom>
                  {customer.telefono}
                </Typography>
              </CardContent>
              {customer.facturas && (
                <MUIDataTable
                  title={"Facturas"}
                  columns={[...customerInvoicesTableColumn, actionsColumn]}
                  options={options}
                  data={customer.facturas.map((factura) => {
                    return [
                      factura.id,
                      factura.fechaEmision,
                      formatCurrency(factura.subTotal),
                      formatCurrency(factura.igv),
                      formatCurrency(factura.total),
                    ];
                  })}
                />
              )}
            </>
          ) : (
            <Spinner />
          )}
        </Card>
      </Container>
      {invoiceId && (
        <DeleteAlert
          deleteService={deleteInvoiceById}
          handleClose={handleClose}
          open={isOpen}
          id={invoiceId}
        />
      )}
    </div>
  );
};
