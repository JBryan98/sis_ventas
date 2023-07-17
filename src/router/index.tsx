import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../Layout/MainLayout";
import {
  CategoriasPage,
  ClientesPage,
  CrearFacturaPage,
  DetallesFacturaPage,
  FacturasClientePage,
  FormularioCategoriaPage,
  FormularioClientePage,
  FormularioProductoPage,
  Home,
  NotFound,
  ProductosPage,
} from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPublic />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      //CATEGORIAS
      {
        path: "categorias",
        element: <CategoriasPage/>
      },
      {
        path: "categorias/crear-categoria",
        element: <FormularioCategoriaPage/>
      },
      {
        path: "categorias/actualizar-categoria/:categoryId",
        element: <FormularioCategoriaPage/>
      },
      //PRODUCTOS
      {
        path: "productos",
        element: <ProductosPage />,
      },
      {
        path: "productos/crear-producto",
        element: <FormularioProductoPage />,
      },
      {
        path: "productos/actualizar-producto/:productId",
        element: <FormularioProductoPage />,
      },
      //CLIENTES
      {
        path: "clientes",
        element: <ClientesPage />,
      },
      {
        path: "clientes/crear-cliente",
        element: <FormularioClientePage />,
      },
      {
        path: "clientes/actualizar-cliente/:customerId",
        element: <FormularioClientePage />,
      },
      {
        path: "clientes/:customerId/facturas",
        element: <FacturasClientePage />,
      },
      {
        path: "clientes/:customerId/factura/:invoiceId",
        element: <DetallesFacturaPage/>
      },

      //FACTURAS
      {
        path: "clientes/:customerId/crear-factura",
        element: <CrearFacturaPage />,
      },
    ],
  },
]);
