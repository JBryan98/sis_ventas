import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../Layout/MainLayout";
import { Home, NotFound, ProductosPage } from "../pages";

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
    ],
  },
]);
