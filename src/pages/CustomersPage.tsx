import { CustomersContent } from "@/components/customers/CustomerContent";
import { CustomerFilters } from "@/components/customers/CustomerFilters";
import { CustomerForm } from "@/components/customers/CustomerForm";
import { ErrorState } from "@/components/states/ErrorState";
import { LoadingState } from "@/components/states/LoadingState";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCustomers } from "@/hooks/useCustomers";
import { useDebounce } from "@/hooks/useDebounce";
import { useFilteredCustomers } from "@/hooks/useFilteredCustomers";
import type { SortField, SortOrder } from "@/types/sorting";
import { Plus } from "lucide-react";
import { useState } from "react";

export function CustomersPage() {
  const { customers, isLoading, isError } = useCustomers();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");

  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const [openCreate, setOpenCreate] = useState(false);

  const debouncedSearch = useDebounce(search, 500);
  const filteredCustomers = useFilteredCustomers({
    customers,
    search: debouncedSearch,
    status,
    sortField,
    sortOrder,
  });

  const uiState = {
    hasCustomers: customers.length > 0,
    isFiltering: search !== debouncedSearch,
  };

  if (isLoading) {
    return <LoadingState message="Carregando clientes..." />;
  }

  if (isError) {
    return <ErrorState />;
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-[1400px] px-6 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Clientes</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Gerencie seus clientes e visualize informações
            </p>
          </div>

          <Button
            onClick={() => setOpenCreate(true)}
            className="bg-white text-foreground"
          >
            <Plus className="h-4 w-4" />
            Novo Cliente
          </Button>
        </header>

        <section className="mb-6">
          <CustomerFilters
            search={search}
            onSearchChange={setSearch}
            status={status}
            onStatusChange={setStatus}
            sortField={sortField}
            onSortFieldChange={setSortField}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
          />
        </section>

        <section className="bg-zinc-900/40 border border-zinc-800 rounded-lg overflow-hidden">
          <CustomersContent
            customers={customers}
            filteredCustomers={filteredCustomers}
            isFiltering={uiState.isFiltering}
          />
        </section>

        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogContent className="bg-primary text-white">
            <DialogHeader>
              <DialogTitle>Novo Cliente</DialogTitle>
            </DialogHeader>

            <CustomerForm onSuccess={() => setOpenCreate(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
