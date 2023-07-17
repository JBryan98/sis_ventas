import { object, string} from "yup"

export const categoryValidationSchema = object({
    nombre: string()
    .trim()
    .max(255, "No debe sobrepasar el máximo de 255 caracteres")
    .required("Campo obligatorio")
})