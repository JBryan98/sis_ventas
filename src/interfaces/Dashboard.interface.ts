export interface DashboardCardInfo {
    totalLast7Days: number;
    newCustomersLast7Days: number;
    totalProducts: number;
    totalCategories: number;
}

export interface Top5CustomersByMonth {
    id: number;
    nombre: string;
    apellido: string;
    montoTotal: number;
}

export interface Top5ProductsByMonth {
    id: number;
    nombre: string;
    cantidadTotal: number;
}