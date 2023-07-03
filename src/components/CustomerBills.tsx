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
import BillService from "../services/BillService";
import MUIDataTable, { MUIDataTableMeta } from "mui-datatables";
import { customerBillsTableColumn } from "../utils/mui-datatable-columns/customerBillsTableColumns";
import { options } from "../utils/muiDatatableOptions";
import { formatCurrency } from "../utils/formatCurrency";
import DeleteAlert from "./DeleteAlert";

export const CustomerBills = (): JSX.Element => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const { isOpen, handleOpen, handleClose } = useAlert();
  const [billId, setBillId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    CustomerService.getCustomerById(Number(customerId)).then((response) =>
      setCustomer(response)
    );
  }, [customerId]);

  const deleteBillById = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.preventDefault();
    BillService.deleteBillById(id).then(() => {
      if (customer) {
        const billsUpdated = customer.facturas?.filter(
          (factura) => factura.id !== id
        );
        setCustomer({ ...customer, facturas: billsUpdated });
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
        value: any,
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
                    setBillId(facturaId);
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
                  onClick={() => navigate(`/clientes/${customerId}/crear-factura`)}
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
          <CardContent>
            <Typography variant="subtitle2" gutterBottom>
              Nombre Completo:
            </Typography>
            <Typography variant="overline" gutterBottom>
              {customer?.nombre + " " + customer?.apellido}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Email:
            </Typography>
            <Typography variant="overline" gutterBottom>
              {customer?.email}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Teléfono:
            </Typography>
            <Typography variant="overline" gutterBottom>
              {customer?.telefono}
            </Typography>
          </CardContent>
          {customer?.facturas && (
            <MUIDataTable
              title={"Facturas"}
              columns={[...customerBillsTableColumn, actionsColumn]}
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
        </Card>
      </Container>
      {billId && (
        <DeleteAlert
          deleteService={deleteBillById}
          handleClose={handleClose}
          open={isOpen}
          id={billId}
        />
      )}
    </div>
  );
};
