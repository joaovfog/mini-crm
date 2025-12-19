import type { Customer } from "@/types/customer";
import { EmptyState } from "../states/EmptyState";
import { CustomerTable } from "./CustomerTable";

export function CustomersContent({
  customers,
  filteredCustomers,
  isFiltering,
}: {
  customers: Customer[];
  filteredCustomers: Customer[];
  isFiltering: boolean;
}) {
  if (!customers.length) {
    return <EmptyState message="Nenhum cliente cadastrado." />;
  }

  if (!filteredCustomers.length) {
    return (
      <EmptyState message="Nenhum cliente encontrado com os filtros aplicados." />
    );
  }

  if (isFiltering) {
    return (
      <p className="text-sm text-center text-muted-foreground">Filtrando...</p>
    );
  }

  return <CustomerTable customers={filteredCustomers} />;
}
