import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CategoryService from "../services/CategoryService";
import { Category } from "../interfaces/Product.interface";
import { categoryValidationSchema } from "../utils/formik-validations/categorySchema";

export const CategoryForm = () => {
  const { categoryId } = useParams();
  const [initialCategory, setInitialCategory] = useState<Category | null>(null);
  const navigate = useNavigate();

  const initialValues: Category = {
    id: 0,
    nombre: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: categoryValidationSchema,
    onSubmit: (values, { setFieldError }) => {
      if (categoryId) {
        if (Object.is(initialCategory, values)) {
          navigate("/categorias");
        } else {
          CategoryService.updateCategory(Number(categoryId), values)
            .then(() => navigate("/categorias"))
            .catch((error) => setFieldError("nombre", error.message));
        }
      } else {
        CategoryService.createCategory(values).then(() =>
          navigate("/categorias")
        );
      }
    },
  });

  useEffect(() => {
    if (categoryId) {
      CategoryService.getCategoryById(Number(categoryId)).then(
        (response: Category) => {
          setInitialCategory(response);
          formik.setValues(response);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  return (
    <div className="pt-10">
      <Card sx={{ maxWidth: 450, margin: "0 auto" }}>
        <CardHeader
          title={categoryId ? "Actualizar Categoría" : "Crear Categoría"}
        />
        <hr />
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid xs={12} item>
                <TextField
                  variant="outlined"
                  label="Nombre"
                  name="nombre"
                  fullWidth
                  value={formik.values.nombre}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                  helperText={formik.touched.nombre && formik.errors.nombre}
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
                  onClick={() => navigate("/categorias")}
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
