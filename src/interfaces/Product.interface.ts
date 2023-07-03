export interface Category {
  id: number;
  nombre: string;
}

export interface Product {
  id?: number;
  nombre: string;
  precio: number;
  stock: number;
  fechaCreacion?: string;
  categoria: Category;
}