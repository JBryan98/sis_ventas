import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../hooks/useAlert"
import InvoiceService from "../services/InvoiceService";
import { formatCurrency } from "../utils/formatCurrency";
import { ConfirmAlert } from "./ConfirmAlert";
import { InvoiceData, Item } from "../reducers/invoiceReducer";

interface Props {
    state: InvoiceData;
    dispatch: any;
    updatePrice: (products: Item[]) => void;
    customerId: number;
}

export const InvoiceItems = ({ state, dispatch, updatePrice, customerId }: Props) => {
    const { isOpen, handleOpen, handleClose } = useAlert();
    const navigate = useNavigate();

    const removeItem = (productId: number) =>{
        const updateItemList = state.items.filter((item: Item) => item.idProducto !== productId);
        updatePrice(updateItemList);
        dispatch({
          type: "REMOVE_ITEM",
          payload: {
            items: updateItemList,
          },
        });
    }

    const handleItemQuantity = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, productId: number) => {
        const itemIndex = state.items.findIndex((item: Item) => item.idProducto === productId);
        if (itemIndex !== -1) {
          const quantity = Number(e.target.value);
          const updateItemList = [...state.items];
          updateItemList[itemIndex] = {
            ...updateItemList[itemIndex],
            cantidad: quantity,
          };
          updatePrice(updateItemList);
          dispatch({
            type: "HANDLE_ITEM_QUANTITY",
            payload: {
              items: updateItemList,
            },
          });
        }
    };

    const setCustomerId = (customerId: number) => {
        const idCliente = Number(customerId);
        dispatch({
          type: "SET_CUSTOMER_ID",
          payload: {
            idCliente,
          },
        });
        console.log(state);
      };
    
      const createCustomerInvoice = (customerId: number, invoice: InvoiceData) => {
        InvoiceService
          .createInvoice(customerId, invoice)
          .then((response) => {
            console.log(response);
            navigate(`/clientes/${customerId}/facturas`);
          })
          .catch((error) => console.log(error));
      };

      const isQuantityGreaterThanStock = state.items.some(
        (item) => item.cantidad > item.stock
      );
    

      return (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow hover>
                  <TableCell colSpan={5}>
                    <div className="flex justify-between items-center h-full">
                      <Typography variant="button" sx={{ typography: "subtitle2" }}>
                        Detalles de la Factura
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleOpen();
                          setCustomerId(customerId);
                        }}
                        disabled={
                          isQuantityGreaterThanStock || state.items.length === 0
                        }
                      >
                        Finalizar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="button">Nombre</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="button">Precio</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="button">Cantidad</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="button">Subtotal</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="button">Acciones</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.items.length === 0 ? (
                  <TableRow hover>
                    <TableCell colSpan={6} align="center">
                      Agregue productos
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {state.items.map((item) => (
                      <TableRow key={item.idProducto} hover>
                        <TableCell>{item.nombre}</TableCell>
                        <TableCell>{formatCurrency(item.precioUnitario)}</TableCell>
                        <TableCell>
                          <TextField
                            error={item.cantidad > item.stock}
                            helperText={
                              item.cantidad > item.stock
                                ? "La cantidad no debe superar al stock disponible '" +
                                  item.stock +
                                  "'"
                                : ""
                            }
                            id="standard-basic"
                            variant="standard"
                            type="tel"
                            InputProps={{
                              sx: {
                                width: 30,
                                "& input": {
                                  textAlign: "center",
                                },
                              },
                            }}
                            defaultValue={item.cantidad}
                            onChange={(e) => handleItemQuantity(e, item.idProducto)}
                          />
                        </TableCell>
                        <TableCell>
                          {formatCurrency(item.precioUnitario * item.cantidad)}
                        </TableCell>
                        <TableCell>
                          <Button
                            color="error"
                            variant="outlined"
                            onClick={() => removeItem(item.idProducto)}
                          >
                            Remover
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell rowSpan={3} colSpan={2} />
                      <TableCell colSpan={2} align="center">
                        <Typography variant="button">Subtotal</Typography>{" "}
                      </TableCell>
                      <TableCell>{formatCurrency(state.subTotal)}</TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell colSpan={2} align="center">
                        <Typography variant="button">IGV 18%</Typography>{" "}
                      </TableCell>
                      <TableCell>{formatCurrency(state.igv)}</TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell colSpan={2} align="center">
                        <Typography variant="button">Total</Typography>{" "}
                      </TableCell>
                      <TableCell>{formatCurrency(state.total)}</TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {isOpen && (
            <ConfirmAlert
              open={isOpen}
              handleClose={handleClose}
              id={customerId}
              invoice={state}
              createCustomerInvoice={createCustomerInvoice}
            />
          )}
        </div>
      );
    };
    