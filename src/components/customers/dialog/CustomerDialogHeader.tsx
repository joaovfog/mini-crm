import { Badge } from "@/components/ui/badge";
import { DialogTitle } from "@/components/ui/dialog";
import type { Customer } from "@/types/customer";
import { User } from "lucide-react";
import type { DialogMode } from "./CustomerDialog";

export function CustomerDialogHeader({
  customer,
  mode,
}: {
  customer: Customer;
  mode: DialogMode;
}) {
  if (mode === "edit") return <DialogTitle>Editar Cliente</DialogTitle>;
  if (mode === "delete") return <DialogTitle>Confirmar Exclusão</DialogTitle>;

  return (
    <div className="flex items-start gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
        <User className="h-6 w-6 text-white" />
      </div>

      <div>
        <DialogTitle className="text-2xl font-semibold text-white">
          {customer.name}
        </DialogTitle>

        <Badge
          className={
            customer.status === "active"
              ? "bg-[#4FBF7A] text-[#0c0a0a] border-0 font-medium rounded-sm mt-1.5"
              : "mt-1.5 bg-secondary text-secondary-foreground border-0 rounded-sm font-medium"
          }
        >
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current inline-block opacity-80" />
          {customer.status === "active" ? "Ativo" : "Inativo"}
        </Badge>
      </div>
    </div>
  );
}
