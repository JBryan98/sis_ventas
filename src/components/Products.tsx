import { useEffect, useState } from "react";
import { Product } from "../interfaces/Product.interface";
import ProductoService from "../services/ProductService";
import { RiEditLine, RiDeleteBinLine, RiAddCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { options } from "../utils/muiDatatableOptions";
import { Button, Container, Grid } from "@mui/material";
import MUIDataTable, { MUIDataTableMeta } from "mui-datatables";
import DeleteAlert from "./DeleteAlert";
import { formatCurrency } from "../utils/formatCurrency";
import { productTableColumns } from "../utils/mui-datatable-columns/productTableColumns";
import { useAlert } from "../hooks/useAlert";
import { Spinner } from "./Spinner";

export const Products = (): JSX.Element => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [id, setId] = useState<number | null>(null);
  const { isOpen, handleOpen, handleClose } = useAlert();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    ProductoService.getAllProducts()
      .then((response) => setProducts(response))
      .finally(() => setIsLoading(false));
  }, []);

  const deleteProduct = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.preventDefault();
    ProductoService.deleteProductById(id).then(() => {
      if (products) {
        setProducts((prevElement) => {
          if (prevElement) {
            return prevElement.filter((product) => product.id !== id);
          }
          return prevElement;
        });
      }
    });
  };

  const columnActions = {
    name: "acciones",
    label: "ACCIONES",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (
        value: any,
        tableMeta: MUIDataTableMeta
      ): JSX.Element => {
        const productId = products && products[tableMeta.rowIndex].id;

        return (
          <>
            {productId && (
              <div>
                <Link
                  to={`/productos/actualizar-producto/${productId}`}
                  className="text-white bg-sky-500 py-1 px-3 mr-2 hover:bg-sky-700 hover:cursor-pointer inline-flex items-center rounded"
                  title="Editar"
                >
                  <RiEditLine
                    className="inline-block mr-0.5 text-xl"
                    title="Editar"
                  />
                </Link>
                <button
                  onClick={() => {
                    handleOpen();
                    setId(productId);
                  }}
                  className="text-white bg-red-500 py-1 px-3 hover:cursor-pointer hover:bg-red-700 inline-flex items-center rounded"
                  title="Eliminar"
                >
                  <RiDeleteBinLine
                    className="inline-block mr-0.5 text-xl"
                    title="Eliminar"
                  />
                </button>
              </div>
            )}
          </>
        );
      },
    },
  };

  const productTableOptions = {
    ...options,
    textLabels: {
      ...options.textLabels,
      body: {
        ...options.textLabels?.body,
        noMatch: isLoading ? (
          <Spinner />
        ) : (
          'Lo sentimos, no se encontraron registros coincidentes"'
        ),
      },
    },
    customToolbar: () => {
      return (
        <>
          <Button
            onClick={() => navigate("/productos/crear-producto")}
            variant="contained"
            color="success"
          >
            <RiAddCircleLine className="text-xl mr-0.5 mb-0.5" />
            Crear Producto
          </Button>
        </>
      );
    },
  };

  return (
    <div>
      <Grid item xs={6}>
        <Container fixed sx={{ paddingTop: 5 }}>
            <MUIDataTable
              title={"Tabla Productos"}
              data={!products ? [] : products.map((product) => {
                return [
                  product.id,
                  product.nombre,
                  formatCurrency(product.precio),
                  product.stock,
                  //product.fechaCreacion,
                  product.categoria.nombre,
                ];
              })}
              columns={[...productTableColumns, columnActions]}
              options={productTableOptions}
            />
        </Container>
      </Grid>
      {/*Se creo el state "id" para poder acceder al id desde fuera del customBodyRender. 
     La razón fue para evitar el fondo negro que daba el componente DeleteAlert,
     (Este es un comportamiento extraño del componente Dialog de MUI)
     https://stackoverflow.com/questions/46946282/dialog-box-in-material-ui-opens-with-a-weird-gray-background
      */}
      {id && (
        <DeleteAlert
          deleteService={deleteProduct}
          handleClose={handleClose}
          open={isOpen}
          id={id}
        />
      )}
    </div>
  );
};
