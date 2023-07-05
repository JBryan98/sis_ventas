import { object, string, number, ref } from "yup";

export const createInvoiceValidationSchema = object({
  nombre: string().trim().required("Debe elegir un producto"),
  cantidad: number()
    .required("Campo obligatorio")
    .integer("La cantidad no debe ser números decimales")
    .positive("No se admiten valores negativos ni cero")
    .test(
      "Cantidad superior al stock disponible",
      "Cantidad superior al stock disponible",
      function (value) {
        const stock: number = this.resolve(ref("stock"));
        return value <= stock;
      }
    ),
});
