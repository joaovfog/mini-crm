import { useMemo, useState } from "react";

interface Params<T> {
  data: T[];
  pageSize: number;
}

export function usePagination<T>({ data, pageSize }: Params<T>) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.length / pageSize);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return data.slice(start, end);
  }, [data, page, pageSize]);

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return {
    page,
    setPage,
    totalPages,
    paginatedData,
    canGoPrev,
    canGoNext,
  };
}
