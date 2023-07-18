import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect, useState, useReducer } from "react";
import { Product } from "../interfaces/Product.interface";
import ProductService from "../services/ProductService";
import { useFormik } from "formik";
import { createInvoiceValidationSchema } from "../utils/formik-validations/createInvoiceSchema";
import invoiceReducer, { Item, initialState } from "../reducers/invoiceReducer";
import { useNavigate, useParams } from "react-router-dom";
import { InvoiceItems } from "./InvoiceItems";

export const InvoiceForm = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [state, dispatch] = useReducer(invoiceReducer, initialState);
  const { customerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    ProductService.getAllProducts().then((response: Product[]) =>
      setProducts(response)
    );
  }, []);

  const initialValues: Item = {
    idProducto: 0,
    nombre: "",
    precioUnitario: 0,
    cantidad: "",
    monto: 0,
    stock: "",
  };

  const addItem = (product: Item) => {
    if (product !== null) {
      const updateItemList = state.items.concat(product);

      //Cada producto agregado actualiza el monto final de la factura
      updatePrice(updateItemList);

      dispatch({
        type: "ADD_ITEM",
        payload: {
          items: updateItemList,
        },
      });
    }
  };

  const updatePrice = (products: Item[]) => {
    let subTotal = 0;
    products.forEach(
      (product) =>
        (subTotal += product.precioUnitario * Number(product.cantidad))
    );
    dispatch({
      type: "UPDATE_PRICE",
      payload: {
        subTotal: subTotal,
        igv: subTotal * 0.18,
      },
    });
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      const monto = Number(values.cantidad) * values.precioUnitario;
      addItem({ ...values, monto });
    },
    validationSchema: createInvoiceValidationSchema,
  });

  console.log(state);

  return (
    <div>
      <Container fixed sx={{ paddingTop: 5 }}>
        <Card sx={{ maxWidth: 500, margin: "auto", marginBottom: 3 }}>
          <CardHeader title="Generar Factura" />
          <hr />
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid xs={12} item>
                  <Autocomplete
                    options={products ? products : []}
                    getOptionLabel={(option) => option.nombre}
                    onChange={(e: React.SyntheticEvent<Element, Event>, value) => {
                      if (value !== null) {
                        formik.setFieldValue("idProducto", value?.id);
                        formik.setFieldValue("nombre", value?.nombre);
                        formik.setFieldValue("stock", value?.stock);
                        formik.setFieldValue("precioUnitario", value?.precio);
                      }
                      else{
                        formik.handleReset(e);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="nombre"
                        label="Producto"
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.nombre && Boolean(formik.errors.nombre)
                        }
                        helperText={
                          formik.values.nombre === ""
                            ? "Por favor elija un producto"
                            : formik.touched.nombre && formik.errors.nombre
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Stock"
                    type="number"
                    fullWidth
                    name="stock"
                    onBlur={formik.handleBlur}
                    value={formik.values.stock}
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    id="outline-basic"
                    label="Cantidad"
                    variant="outlined"
                    type="number"
                    fullWidth
                    name="cantidad"
                    disabled={formik.values.nombre === "" || formik.values.nombre === null}
                    value={formik.values.cantidad}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.cantidad && Boolean(formik.errors.cantidad)
                    }
                    helperText={
                      formik.touched.cantidad && formik.errors.cantidad
                    }
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    type="submit"
                  >
                    Agregar
                  </Button>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={() => navigate(`/clientes/${customerId}/facturas`)}
                  >
                    Cancelar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
        <InvoiceItems
          state={state}
          dispatch={dispatch}
          updatePrice={updatePrice}
          customerId={Number(customerId)}
        />
      </Container>
    </div>
  );
};
