import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { customerValidationSchema } from "../utils/formik-validations/customerSchema";
import { useEffect } from "react";
import CustomerService from "../services/CustomerService";
import { Customer } from "../interfaces/Customer.interface";

interface CustomerFormValues {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}

export const CustomerForm = (): JSX.Element => {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const initialValues: CustomerFormValues = {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: customerValidationSchema,
    onSubmit: (values) => {
      if (customerId) {
        CustomerService
        .updateCustomerById(Number(customerId), values)
        .then(() => navigate("/clientes"));
      } else {
        CustomerService
        .createCustomer(values)
        .then(() =>navigate("/clientes"));
      }
    },
  });

  useEffect(() => {
    if (customerId) {
      CustomerService.getCustomerById(Number(customerId)).then(
        (response: Customer) => {
          formik.setValues({
            ...initialValues,
            nombre: response.nombre,
            apellido: response.apellido,
            email: response.email,
            telefono: response.telefono,
          });
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  return (
    <div className="pt-10">
      <Card sx={{ maxWidth: 450, margin: "0 auto" }}>
        <CardHeader
          title={customerId ? "Actualizar cliente" : "Crear cliente"}
        />
        <hr />
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid xs={12} item>
                <TextField
                  id="outline-basic"
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  value={formik.values.nombre}
                  name="nombre"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                  helperText={formik.touched.nombre && formik.errors.nombre}
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  id="outline-basic"
                  label="Apellido"
                  variant="outlined"
                  fullWidth
                  value={formik.values.apellido}
                  name="apellido"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.apellido && Boolean(formik.errors.apellido)
                  }
                  helperText={formik.touched.apellido && formik.errors.apellido}
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  id="outline-basic"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={formik.values.email}
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  id="outline-basic"
                  label="Teléfono"
                  variant="outlined"
                  fullWidth
                  type="tel"
                  value={formik.values.telefono}
                  name="telefono"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.telefono && Boolean(formik.errors.telefono)
                  }
                  helperText={formik.touched.telefono && formik.errors.telefono}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  type="submit"
                >
                  Confirmar
                </Button>
              </Grid>
              <Grid xs={12} sm={6} item>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={() => navigate("/clientes")}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
