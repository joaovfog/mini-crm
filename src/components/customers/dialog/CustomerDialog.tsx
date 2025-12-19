import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useCustomers } from "@/hooks/useCustomers";
import type { Customer } from "@/types/customer";
import { useState } from "react";
import { toast } from "sonner";
import { CustomerDialogContent } from "./CustomerDialogContent";
import { CustomerDialogHeader } from "./CustomerDialogHeader";

interface Props {
  customer: Customer;
  onClose: () => void;
}

export type DialogMode = "view" | "edit" | "delete";

export function CustomerDialog({ customer, onClose }: Props) {
  const [mode, setMode] = useState<DialogMode>("view");
  const [isDeleting, setIsDeleting] = useState(false);

  const { deleteCustomer } = useCustomers();

  async function handleDelete() {
    try {
      setIsDeleting(true);
      await deleteCustomer(customer.id);
      onClose();
    } catch {
      toast.error("Erro ao excluir cliente");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-primary text-white">
        <DialogHeader>
          <CustomerDialogHeader customer={customer} mode={mode} />
        </DialogHeader>

        <CustomerDialogContent
          mode={mode}
          customer={customer}
          onClose={onClose}
          setMode={setMode}
          isDeleting={isDeleting}
          handleDelete={handleDelete}
        />
      </DialogContent>
    </Dialog>
  );
}
