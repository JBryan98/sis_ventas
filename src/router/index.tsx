import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../Layout/MainLayout";
import { Home, NotFound, ProductosPage } from "../pages";
import { ClientesPage } from "../pages/ClientesPage";
import { FormularioProductoPage } from "../pages/FormularioProductoPage";
import { FormularioClientePage } from "../pages/FormularioCliente";

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
      //Productos
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
      //Clientes
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
    ],
  },
]);
