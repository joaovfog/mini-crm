import { Button } from "@/components/ui/button";
import type { Customer } from "@/types/customer";
import { formatDate } from "@/utils/formatDate";
import {
  Calendar,
  Edit,
  Mail,
  MessageSquare,
  Phone,
  Trash2,
} from "lucide-react";

interface Props {
  customer: Customer;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-foreground">
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        <p className="text-sm font-medium text-white break-all">{value}</p>
      </div>
    </div>
  );
}

export function CustomerDialogDetails({
  customer,
  onClose,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="space-y-4 mt-6">
      <section className="rounded-lg border border-ring bg-ring p-5">
        <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-4">
          Informações de Contato
        </h3>

        <div className="space-y-3">
          <InfoItem
            icon={<Mail className="h-4 w-4 text-muted-foreground" />}
            label="E-mail"
            value={customer.email}
          />

          {customer.phone && (
            <InfoItem
              icon={<Phone className="h-4 w-4 text-muted-foreground" />}
              label="Telefone"
              value={customer.phone}
            />
          )}
        </div>
      </section>

      <section className="rounded-lg border border-ring bg-ring p-5">
        <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-4">
          Informações da Conta
        </h3>

        <InfoItem
          icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
          label="Data de Criação"
          value={formatDate(customer.createdAt)}
        />
      </section>

      {customer.notes && (
        <section className="rounded-lg border border-ring bg-ring p-5">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Observações
            </h3>
          </div>

          <p className="text-sm text-white leading-relaxed">{customer.notes}</p>
        </section>
      )}

      <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={onClose}
          className="bg-foreground hover:bg-muted border-border"
        >
          Fechar
        </Button>

        <Button
          variant="outline"
          onClick={onEdit}
          className="bg-foreground hover:bg-muted border-border"
        >
          <Edit className="h-4 w-4" />
          Editar
        </Button>

        <Button
          variant="destructive"
          onClick={onDelete}
          className="bg-destructive hover:bg-destructive/90"
        >
          <Trash2 className="h-4 w-4" />
          Excluir
        </Button>
      </div>
    </div>
  );
}
