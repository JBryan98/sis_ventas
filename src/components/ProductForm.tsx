import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Category, Product } from "../interfaces/Product.interface";
import { useFormik } from "formik";
import { productValidationSchema } from "../utils/formik-validations/productSchema";
import CategoryService from "../services/CategoryService";
import ProductService from "../services/ProductService";

interface ProductFormValues {
  nombre: string;
  precio: "" | number;
  stock: "" | number;
  categoria: Category;
}

export const ProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[] | null>(null);
  const initialValues: ProductFormValues = {
    nombre: "",
    precio: "",
    stock: "",
    categoria: {
      id: 0,
      nombre: "",
    },
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: productValidationSchema,
    onSubmit: (values) => alert(JSON.stringify(values, null, 2)),
  });

  useEffect(() => {
    CategoryService.getAllProducts().then((response) =>
      setCategories(response)
    );
  }, []);

  useEffect(() => {
    if (productId) {
      ProductService.getProductById(Number(productId)).then(
        (response: Product) => {
          formik.setValues({
            ...initialValues,
            nombre: response.nombre,
            precio: response.precio,
            stock: response.stock,
            categoria: {
              id: response.categoria.id,
              nombre: response.categoria.nombre,
            },
          });
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
    <div className="pt-10">
      <Card sx={{ maxWidth: 450, margin: "0 auto" }}>
        <CardHeader
          title={productId ? "Actualizar Producto" : "Crear Producto"}
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
                  label="Precio"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={formik.values.precio}
                  name="precio"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.precio && Boolean(formik.errors.precio)}
                  helperText={formik.touched.precio && formik.errors.precio}
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  id="outline-basic"
                  label="Stock"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={formik.values.stock}
                  name="stock"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.stock && Boolean(formik.errors.stock)}
                  helperText={formik.touched.stock && formik.errors.stock}
                />
              </Grid>
              <Grid xs={12} item>
                {!productId
                  ? categories && (
                      <Autocomplete
                        id="combo-box-demo"
                        options={categories}
                        getOptionLabel={(option) => option.nombre}
                        onChange={(_, value) => {
                          formik.setFieldValue("categoria", value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="categoria"
                            label="Categoría"
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.categoria &&
                              Boolean(formik.errors.categoria)
                            }
                            helperText={
                              formik.values.categoria === null
                                ? "Por favor elija una categoria"
                                : formik.touched.categoria?.nombre &&
                                  formik.errors.categoria?.nombre
                            }
                          />
                        )}
                      />
                    )
                  : categories && (
                      <Autocomplete
                        id="combo-box-demo"
                        options={categories}
                        getOptionLabel={(option) => option.nombre}
                        onChange={(_, value) => {
                          formik.setFieldValue("categoria", value);
                        }}
                        value={formik.values.categoria}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="categoria"
                            label="Categoría"
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.categoria &&
                              Boolean(formik.errors.categoria)
                            }
                            helperText={
                              formik.values.categoria === null
                                ? "Por favor elija una categoria"
                                : formik.touched.categoria?.nombre &&
                                  formik.errors.categoria?.nombre
                            }
                          />
                        )}
                      />
                    )}
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
                  onClick={() => navigate("/productos")}
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
