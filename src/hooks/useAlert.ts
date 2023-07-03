import { useState } from "react";

export const useAlert = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = (): void => {
    setIsOpen(true);
  };
  const handleClose = (): void => {
    setIsOpen(false);
  };

  return {
    isOpen,
    handleOpen,
    handleClose,
  };
};
