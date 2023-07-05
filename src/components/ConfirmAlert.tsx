import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { InvoiceData } from "../reducers/invoiceReducer";

interface Props {
    open: boolean;
    handleClose: () => void;
    id: number;
    invoice: InvoiceData;
    createCustomerInvoice: (customerId: number, invoice: InvoiceData) => void;
}

export const ConfirmAlert = ({ open, handleClose, id, invoice, createCustomerInvoice }: Props) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Generar venta</DialogTitle>
        <DialogContent id="alert-dialog-description">
          Esta a punto de generar una nueva venta, esta seguro de los datos
          ingresados son correctos?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              createCustomerInvoice(id, invoice);
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
