import * as Yup from "yup";

export const productValidationSchema = Yup.object({
  nombre: Yup.string()
    .trim()
    .max(255, "No debe sobrepasar un máximo de 255 caracteres")
    .required("Campo obligatorio"),
  precio: Yup.number()
    .positive("El precio no puede ser un número negativo ni cero")
    .test(
      "maxDigitsAfterDecimal",
      "El precio debe contener 2 digitos decimales como máximo",
      (number) => /^\d+(\.\d{1,2})?$/.test(String(number))
    )
    .required("Campo obligatorio"),
  stock: Yup.number()
    .positive("El stock no puede ser un número negativo ni cero")
    .integer("El stock debe ser un número entero")
    .required("Campo obligatorio"),
  categoria: Yup.object()
    .shape({
      id: Yup.number().min(1).required("Debe elegir una categoría"),
      nombre: Yup.string().trim().required("Debe elegir una categoría"),
    })
    .required("Debe elegir una categoría"),
});
