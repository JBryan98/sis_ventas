export interface Invoice {
    id: number,
    fechaEmision: string,
    subTotal: number,
    igv: number,
    total: number
}

export interface Customer {
    id?: number,
    nombre: string,
    apellido: string,
    email: string,
    telefono: string,
    fechaCreacion?: string,
    facturas?: Invoice[]
}