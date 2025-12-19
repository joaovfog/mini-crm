import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePagination } from "@/hooks/usePagination";
import type { Customer } from "@/types/customer";
import { formatDate } from "@/utils/formatDate";
import { SquareChevronLeft, SquareChevronRight } from "lucide-react";
import { useState } from "react";
import { CustomerDialog } from "./dialog/CustomerDialog";

interface Props {
  customers: Customer[];
}

const PAGE_SIZE = 5;

export function CustomerTable({ customers }: Props) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const { page, setPage, totalPages, paginatedData, canGoNext, canGoPrev } =
    usePagination({
      data: customers,
      pageSize: PAGE_SIZE,
    });

  return (
    <>
      <Table>
        <TableHeader className="bg-zinc-900 text-xs text-muted-foreground">
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Criado em</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-zinc-800">
          {paginatedData.map((customer) => (
            <TableRow
              key={customer.id}
              className="cursor-pointer hover:bg-zinc-800/40 transition"
              onClick={() => setSelectedCustomer(customer)}
            >
              <TableCell className="text-sm font-medium">
                {customer.name}
              </TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>
                {customer.status === "active" ? (
                  <Badge className="bg-[#00a63e] text-[#0c0a0a] border-0 font-medium rounded-sm">
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[#0c0a0a] inline-block" />
                    Ativo
                  </Badge>
                ) : (
                  <Badge
                    variant="secondary"
                    className="bg-secondary text-secondary-foreground border-0 font-medium rounded-sm"
                  >
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground inline-block" />
                    Inativo
                  </Badge>
                )}
              </TableCell>
              <TableCell>{formatDate(customer.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 text-sm text-muted-foreground">
          <span>
            Página {page} de {totalPages}
          </span>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={!canGoPrev}
              onClick={() => setPage((p) => p - 1)}
            >
              <SquareChevronLeft />
            </Button>

            <Button
              size="sm"
              variant="outline"
              disabled={!canGoNext}
              onClick={() => setPage((p) => p + 1)}
            >
              <SquareChevronRight />
            </Button>
          </div>
        </div>
      )}

      {selectedCustomer && (
        <CustomerDialog
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </>
  );
}
