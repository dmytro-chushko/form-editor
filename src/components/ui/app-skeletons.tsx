import { Skeleton } from '@/components/ui/skeleton';

export function TableSkeleton({
  rows = 5,
  columns = 4,
}: {
  rows?: number;
  columns?: number;
}) {
  return (
    <div className="w-full space-y-4">
      <div className="rounded-md border">
        <div className="border-b px-4 py-3">
          <div className="flex items-center gap-4">
            {Array.from({ length: columns }).map((_, i) => (
              <Skeleton key={i} className="h-4 flex-1" />
            ))}
          </div>
        </div>
        <div className="divide-y">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-4">
              {Array.from({ length: columns }).map((_, j) => (
                <Skeleton key={j} className="h-4 flex-1" />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Skeleton className="h-8 w-[100px]" />
        <Skeleton className="h-8 w-[70px]" />
      </div>
    </div>
  );
}

export function ResultsTableSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <div className="sm:w-64 space-y-1">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="sm:w-56 space-y-1">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="sm:w-56 space-y-1">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>
      <TableSkeleton rows={5} columns={4} />
    </div>
  );
}

export function ProfileCardSkeleton() {
  return (
    <div className="mt-6 space-y-6 rounded-md border p-6">
      <div className="flex items-center gap-4 flex-wrap max-sm:flex-col max-sm:items-center">
        <Skeleton className="h-32 w-32 rounded-full" />
        <div className="space-y-2 max-sm:text-center">
          <Skeleton className="h-4 w-48 mx-auto sm:mx-0" />
          <Skeleton className="h-4 w-32 mx-auto sm:mx-0" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

export function SharedFormSkeleton() {
  return (
    <div className="container mx-auto py-12 space-y-8">
      <div className="flex flex-col items-center gap-4 border-b pb-8">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-4 pt-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
        <div className="flex justify-end pt-4">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}

export function FormEditorSkeleton() {
  return (
    <div className="flex flex-col h-full w-full md:p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="border rounded shadow-sm flex-1 min-h-[600px] flex flex-col">
        <div className="h-14 border-b flex items-center justify-between px-4">
          <div className="flex gap-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
        <div className="flex-1 flex">
          <div className="w-64 border-r p-4 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex-1 p-8 space-y-8">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="w-64 border-l p-4 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
