import type { Customer } from "@/types/customer";
import { CustomerForm } from "../CustomerForm";
import type { DialogMode } from "./CustomerDialog";
import { CustomerDialogDeleteConfirmation } from "./CustomerDialogDeleteConfirmation";
import { CustomerDialogDetails } from "./CustomerDialogDetails";

export function CustomerDialogContent({
  mode,
  customer,
  onClose,
  setMode,
  isDeleting,
  handleDelete,
}: {
  mode: DialogMode;
  customer: Customer;
  onClose: () => void;
  setMode: (mode: DialogMode) => void;
  isDeleting: boolean;
  handleDelete: () => void;
}) {
  switch (mode) {
    case "edit":
      return (
        <CustomerForm
          customer={customer}
          onSuccess={() => {
            setMode("view");
            onClose();
          }}
        />
      );

    case "delete":
      return (
        <CustomerDialogDeleteConfirmation
          isDeleting={isDeleting}
          handleDelete={handleDelete}
          onCancel={() => setMode("view")}
        />
      );

    default:
      return (
        <CustomerDialogDetails
          customer={customer}
          onClose={onClose}
          onEdit={() => setMode("edit")}
          onDelete={() => setMode("delete")}
        />
      );
  }
}
