import { Category } from "./Product.interface"

interface Items {
    id: number,
    cantidad: number,
    producto: {
        id: number,
        nombre: string,
        precio: number,
        categoria: Category
    }
}

export interface BillDetails {
    id: number,
    fechaEmision: number,
    subTotal: number,
    igv: number,
    total: number,
    cliente: {
        id: number,
        nombre: string,
        apellido: string,
        telefono: string,
        email: string
    }
    items: Items[]
}