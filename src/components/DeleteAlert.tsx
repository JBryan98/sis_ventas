import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface Props {
  deleteService: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => void;
  handleClose: () => void;
  open: boolean;
  id: number;
}

const DeleteAlert = ({ deleteService, handleClose, open, id }: Props) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Estas seguro que deseas eliminar?"}
        </DialogTitle>
        <DialogContent id="alert-dialog-description">
          Esta acción es irreversible
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => {
              handleClose();
              deleteService(e, id);
            }}
            variant="contained"
            color="success"
          >
            Aceptar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleClose()}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteAlert;
