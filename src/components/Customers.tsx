import { useAlert } from "../hooks/useAlert";
import { ImClipboard } from "react-icons/im";
import { RiEditLine, RiDeleteBinLine, RiAddCircleLine } from "react-icons/ri";
import { Customer } from "../interfaces/Customer.interface";
import { useEffect, useState } from "react";
import { Button, Container, Grid } from "@mui/material";
import CustomerService from "../services/CustomerService";
import MUIDataTable, { MUIDataTableMeta } from "mui-datatables";
import { Link, useNavigate } from "react-router-dom";
import { options } from "../utils/muiDatatableOptions";
import { customerTableColumns } from "../utils/mui-datatable-columns/customerTableColumns";
import DeleteAlert from "./DeleteAlert";

export const Customers = (): JSX.Element => {
  const [customers, setCustomers] = useState<Customer[] | null>(null);
  const { isOpen, handleOpen, handleClose } = useAlert();
  const [customerId, setCustomerId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    CustomerService.getAllCustomers().then((response) =>
      setCustomers(response)
    );
  }, []);

  const deleteCustomer = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.preventDefault();
    CustomerService.deleteCustomerById(id).then(() => {
      if (customers) {
        setCustomers((prevElement) => {
          if (prevElement) {
            return prevElement.filter((customer) => customer.id !== id);
          }
          return prevElement;
        });
      }
    });
  };

  const columnActions = {
    name: "acciones",
    label: "ACCIONES",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (
        value: any,
        tableMeta: MUIDataTableMeta
      ): JSX.Element => {
        const customerId = customers && customers[tableMeta.rowIndex].id;

        return (
          <>
            {customerId && (
              <div>
                <Link
                  title="Ver Facturas"
                  to={`/clientes/${customerId}/facturas`}
                  className="text-white bg-indigo-500 py-1 px-3 mr-2 hover:bg-indigo-700 hover:cursor-pointer inline-flex items-center rounded"
                >
                  <ImClipboard className="inline-block mr-0.5 text-xl" title="Ver Facturas"/>
                </Link>
                <Link
                  title="Editar"
                  to={`/clientes/actualizar-cliente/${customerId}`}
                  className="text-white bg-sky-500 py-1 px-3 mr-2 hover:bg-sky-700 hover:cursor-pointer inline-flex items-center rounded"
                >
                  <RiEditLine className="inline-block mr-0.5 text-xl" title="Editar"/>
                </Link>
                <button
                  onClick={() => {
                    handleOpen();
                    setCustomerId(customerId);
                  }}
                  className="text-white bg-red-500 py-1 px-3 hover:cursor-pointer hover:bg-red-700 inline-flex items-center rounded"
                  title="Eliminar"
                >
                  <RiDeleteBinLine className="inline-block mr-0.5 text-xl" title="Eliminar"/>
                </button>
              </div>
            )}
          </>
        );
      },
    },
  };

  const customerTableOptions = {
    ...options,
    customToolbar: () => {
      return (
        <>
          <Button
            onClick={() => navigate("/clientes/crear-cliente")}
            variant="contained"
            color="success"
          >
            <RiAddCircleLine className="text-xl mr-0.5 mb-0.5" />
            Crear Cliente
          </Button>
        </>
      );
    },
  };

  return (
    <div>
      <Grid item xs={6}>
        <Container fixed sx={{ paddingTop: 5 }}>
          {customers && (
            <MUIDataTable
              title={"Tabla Clientes"}
              data={customers.map((customer) => {
                return [
                  customer.id,
                  customer.nombre,
                  customer.apellido,
                  customer.email,
                  customer.telefono,
                  customer.fechaCreacion,
                ];
              })}
              columns={[...customerTableColumns, columnActions]}
              options={customerTableOptions}
            />
          )}
        </Container>
      </Grid>
      {/*Se creo el state "id" para poder acceder al id desde fuera del customBodyRender. 
        La razón fue para evitar el fondo negro que daba el componente DeleteAlert,
    (Este es un comportamiento extraño del componente Dialog de MUI cuando se coloca dentro de un contenedor que no sea el principal del componente)
 https://stackoverflow.com/questions/46946282/dialog-box-in-material-ui-opens-with-a-weird-gray-background
  */}
      {customerId && (
        <DeleteAlert
          deleteService={deleteCustomer}
          handleClose={handleClose}
          open={isOpen}
          id={customerId}
        />
      )}
    </div>
  );
};
