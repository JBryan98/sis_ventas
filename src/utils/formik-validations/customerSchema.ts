import { object, string } from "yup";

export const customerValidationSchema = object({
  nombre: string()
    .trim()
    .max(255, "No debe sobrepasar un máximo de 255 caracteres")
    .required("Campo obligatorio"),
  apellido: string()
    .trim()
    .max(255, "No debe sobrepasar un máximo de 255 caracteres")
    .required("Campo obligatorio"),
  email: string()
    .trim()
    .email("El formato de email es inválido")
    .required("Campo obligatorio"),
  telefono: string()
    .matches(
      /^\d{9}$/,
      "El número de teléfono debe contener 9 dígitos numéricos"
    )
    .required("Campo obligatorio"),
});
