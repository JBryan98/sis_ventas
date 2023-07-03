import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../Layout/MainLayout";
import { Home, NotFound, ProductosPage } from "../pages";
import { CrearProductoPage } from "../pages/CrearProductoPage";
import { ActualizarProductoPage } from "../pages/ActualizarProductoPage";

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
      {
        path: "productos",
        element: <ProductosPage />,
      },
      {
        path: "productos/crear-producto",
        element: <CrearProductoPage />,
      },
      {
        path: "productos/actualizar-producto/:productId",
        element: <ActualizarProductoPage />
      }
    ],
  },
]);
