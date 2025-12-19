import type { Customer } from "@/types/customer";
import type { SortField, SortOrder } from "@/types/sorting";
import { useMemo } from "react";

interface Params {
  customers: Customer[];
  search: string;
  status: "all" | "active" | "inactive";
  sortField: SortField;
  sortOrder: SortOrder;
}

export function useFilteredCustomers({
  customers,
  search,
  status,
  sortField,
  sortOrder,
}: Params) {
  return useMemo(() => {
    const searchValue = search.toLowerCase();

    return customers
      .filter((c) => {
        if (status !== "all" && c.status !== status) return false;

        return (
          c.name.toLowerCase().includes(searchValue) ||
          c.email.toLowerCase().includes(searchValue)
        );
      })
      .sort((a, b) => {
        const compareMap: Record<SortField, number> = {
          name: a.name.localeCompare(b.name),
          createdAt:
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        };

        const result = compareMap[sortField];
        return sortOrder === "asc" ? result : -result;
      });
  }, [customers, search, status, sortField, sortOrder]);
}
