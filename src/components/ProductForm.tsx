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
  categoria: Category | null;
}

export const ProductForm = (): JSX.Element => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[] | null>(null);
  const initialValues: ProductFormValues = {
    nombre: "",
    precio: "",
    stock: "",
    categoria: null,
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: productValidationSchema,
    onSubmit: (values) => {
      const product: Product = {
        ...values,
        precio: Number(values.precio),
        stock: Number(values.stock),
        categoria: values.categoria || { id: 0, nombre: "" },
      };

      if (productId) {
        ProductService.updateProduct(Number(productId), product).then(() =>
          navigate("/productos")
        );
      } else {
        ProductService.createProduct(product).then(() =>
          navigate("/productos")
        );
      }
    },
  });

  useEffect(() => {
    CategoryService.getAllCategories().then((response: Category[]) =>
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

  console.log(formik.values);

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
                {categories && (
                  <Autocomplete
                    id="combo-box-demo"
                    options={categories}
                    getOptionLabel={(option) => option.nombre}
                    isOptionEqualToValue={(option, value) =>
                      option.nombre === value.nombre
                    }
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
                          formik.touched.categoria && formik.errors.categoria
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
