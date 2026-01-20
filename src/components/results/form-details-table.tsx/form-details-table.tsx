'use client';

import { useParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useResults } from '@/features/results/lib/use-results';
import { ResultExports } from '@/features/results/ui/result-exports';

import { columns } from './form-details-columns';
import { FormDetailsMobileCard } from './form-details-mobile-card';

export function FormDetailsTable() {
  const { formId } = useParams<{ formId: string }>();
  const {
    formResults,
    contentDataArray,
    isLoading,
    page,
    setPage,
    pageSize,
    totalCount,
    email,
    setEmail,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
  } = useResults();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <div className="sm:w-64">
            <label className="block text-sm mb-1">Email</label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Filter by email"
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

        <ResultExports
          exportRoute={`/api/results/${formId}/export`}
          filters={{
            email: email,
            from: fromDate?.toISOString(),
            to: toDate?.toISOString(),
          }}
        />
      </div>

      {!formResults || formResults.length === 0 ? (
        <div className="py-10 text-center text-muted-foreground border rounded-md">
          No submissions found
        </div>
      ) : (
        <DataTable
          columns={columns(contentDataArray)}
          data={formResults}
          pageIndex={page}
          setPageIndex={setPage}
          totalCount={totalCount}
          pageSize={pageSize}
          renderMobileRow={(row) => <FormDetailsMobileCard {...row} />}
        />
      )}
    </div>
  );
}
