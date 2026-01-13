'use client';

import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useGetResultsOverview } from '@/features/results/results.api';
import { useDebouncedValue } from '@/lib/hooks/use-debounce';

import { columns } from './overview-columns';
import { OverviewMobileCard } from './overview-mobile-card';

export function OverviewTable() {
  const [page, setPage] = useState(1);
  const pageSize = 2;
  const [title, setTitle] = useState('');
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();

  const debouncedTitle = useDebouncedValue(title, 500);
  const debouncedFromISO = useDebouncedValue(
    fromDate ? fromDate.toISOString() : undefined,
    500
  );
  const debouncedToISO = useDebouncedValue(
    toDate ? toDate.toISOString() : undefined,
    500
  );

  useEffect(() => {
    setPage(1);
  }, [debouncedTitle, debouncedFromISO, debouncedToISO]);

  const params = useMemo(
    () => ({
      page,
      pageSize,
      title: title || undefined,
      from: fromDate ? fromDate.toISOString() : undefined,
      to: toDate ? toDate.toISOString() : undefined,
    }),
    [page, pageSize, title, fromDate, toDate]
  );

  const { data, isLoading } = useGetResultsOverview(params);

  if (isLoading) return <div>Loading…</div>;

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <div className="sm:w-64">
          <label className="block text-sm mb-1">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Filter by title"
          />
        </div>

        <div className="sm:w-56">
          <label className="block text-sm mb-1">From</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                {fromDate ? fromDate.toLocaleDateString() : 'Pick date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Calendar
                mode="single"
                selected={fromDate}
                onSelect={setFromDate}
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="sm:w-56">
          <label className="block text-sm mb-1">To</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                {toDate ? toDate.toLocaleDateString() : 'Pick date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Calendar
                mode="single"
                selected={toDate}
                onSelect={setToDate}
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {!data || data.items.length === 0 ? (
        <div>No forms yet</div>
      ) : (
        <DataTable
          columns={columns}
          data={data?.items}
          pageIndex={page}
          setPageIndex={setPage}
          totalCount={data.total}
          pageSize={data.pageSize}
          renderMobileRow={(row: (typeof data.items)[number]) => (
            <OverviewMobileCard {...row} />
          )}
        />
      )}
    </div>
  );
}
