'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from './button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
} from './pagination';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  showPagination?: boolean;
  pageSize?: number;
  totalCount?: number;
  pageIndex: number;
  setPageIndex: (pageIndex: number) => void;
  renderMobileRow?: (row: TData) => React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  className,
  showPagination = true,
  pageSize = 10,
  totalCount = 0,
  pageIndex,
  setPageIndex,
  renderMobileRow,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={className}>
      <div className="overflow-hidden rounded-md border hidden md:block">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Mobile Row */}
      {renderMobileRow && (
        <div className="flex flex-col gap-8 md:hidden">
          {table.getRowModel().rows.map((row) => (
            <div key={row.index}>{renderMobileRow(row.original)}</div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {showPagination && totalCount > pageSize && (
        <DataTablePagination
          pageSize={pageSize}
          totalCount={totalCount}
          pageIndex={pageIndex}
          setPageIndex={(newIndex) => {
            setPageIndex(newIndex);

            // if (onFiltersChange) {
            //   onFiltersChange({ ...externalFilters, page: newIndex });
            // }
          }}
        />
      )}
    </div>
  );
}

interface DataTablePaginationProps<TData> {
  pageSize: number;
  totalCount: number;
  pageIndex: number;
  setPageIndex: (pageIndex: number) => void;
}

function DataTablePagination<TData>({
  pageSize,
  totalCount,
  pageIndex,
  setPageIndex,
}: DataTablePaginationProps<TData>) {
  // pageIndex is 0-based in DataTable, but we display 1-based pages
  const currentPage = pageIndex + 1;
  const totalPages = Math.ceil(totalCount / pageSize);
  const pages: (number | string)[] = [];
  const maxVisible = 7;

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);

    if (currentPage <= 3) {
      for (let i = 2; i <= 4; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push('...');
      for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    }
  }

  return (
    <div className="flex flex-col gap-5 p-6 rounded-lg">
      <Pagination>
        <PaginationContent className="gap-1">
          <Button
            variant="outline"
            onClick={() => setPageIndex(0)}
            disabled={pageIndex === 0}
            className="w-20"
          >
            <ChevronsLeft className="size-7" />
          </Button>
          <Button
            variant="outline"
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={pageIndex === 0}
            className="w-20"
          >
            <ChevronLeft className="size-7" />
          </Button>

          {pages.map((page, index) =>
            page === '...' ? (
              <PaginationEllipsis key={index} />
            ) : (
              <Button
                key={page}
                variant="outline"
                onClick={() => setPageIndex((page as number) - 1)}
                className={
                  currentPage === page
                    ? 'bg-neutral-100 text-neutral-900 w-20'
                    : 'w-20 text-neutral-600'
                }
              >
                {page}
              </Button>
            )
          )}

          <Button
            variant="outline"
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={pageIndex >= totalPages - 1}
            className="w-20"
          >
            <ChevronRight className="size-7" />
          </Button>
          <Button
            variant="outline"
            onClick={() => setPageIndex(totalPages - 1)}
            disabled={pageIndex >= totalPages - 1}
            className="w-20"
          >
            <ChevronsRight className="size-7" />
          </Button>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
