import { CircularProgress } from "@mui/material";

export const Spinner = () => {
  return (
    <div className="flex flex-col p-5">
      <CircularProgress size={70} sx={{ margin: "auto" }} />
      <p className="text-center font-semibold text-lg animate-pulse">
        Cargando
      </p>
    </div>
  );
};
