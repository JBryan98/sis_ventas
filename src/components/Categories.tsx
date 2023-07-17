import MUIDataTable, { MUIDataTableMeta } from "mui-datatables";
import { useEffect, useState } from "react";
import { Container, Button } from "@mui/material";
import { RiAddCircleLine, RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import CategoryService from "../services/CategoryService";
import { Category } from "../interfaces/Product.interface";
import { useAlert } from "../hooks/useAlert";
import DeleteAlert from "./DeleteAlert";
import { categoryTableColumns } from "../utils/mui-datatable-columns/categoryTableColumns";
import { options } from "../utils/muiDatatableOptions";
import { Spinner } from "./Spinner";

const Categories = (): JSX.Element => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const { isOpen, handleOpen, handleClose } = useAlert();
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    CategoryService.getAllCategories()
      .then((response: Category[]) => setCategories(response))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  console.log(categories);

  const deleteCategory = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.preventDefault();
    CategoryService.deleteCategoryById(id).then(() => {
      if (categories) {
        setCategories((prevElement) => {
          if (prevElement) {
            return prevElement.filter((category) => category.id !== id);
          }
          return prevElement;
        });
      }
    });
  };

  const columnActions = {
    name: "Acciones",
    label: "ACCIONES",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (
        value: any,
        tableMeta: MUIDataTableMeta
      ): JSX.Element => {
        const categoryId = categories && categories[tableMeta.rowIndex].id;
        return (
          <>
            {categoryId && (
              <div>
                <Link
                  to={`/categorias/actualizar-categoria/${categoryId}`}
                  className="text-white bg-sky-500 py-1 px-3 mr-2 hover:bg-sky-700 hover:cursor-pointer inline-flex items-center rounded"
                  title="Editar"
                >
                  <RiEditLine className="inline-block mr-0.5 text-xl" />
                </Link>
                <button
                  onClick={() => {
                    handleOpen();
                    setCategoryId(categoryId);
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

  const categoryTableOptions = {
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
        <Button
          onClick={() => navigate("/categorias/crear-categoria")}
          variant="contained"
          color="success"
        >
          <RiAddCircleLine className="text-xl mr-0.5 mb-0.5" />
          Crear Categoría
        </Button>
      );
    },
  };

  return (
    <div>
      <Container fixed sx={{ paddingTop: 5 }}>
        <MUIDataTable
          title="Lista de categorías"
          data={
            !categories
              ? []
              : categories.map((category) => {
                  return [category.id, category.nombre];
                })
          }
          columns={[...categoryTableColumns, columnActions]}
          options={categoryTableOptions}
        />
      </Container>
      {categoryId && (
        <DeleteAlert
          deleteService={deleteCategory}
          handleClose={handleClose}
          open={isOpen}
          id={categoryId}
        />
      )}
    </div>
  );
};

export default Categories;
