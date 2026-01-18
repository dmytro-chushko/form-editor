'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DataTable } from '@/components/ui/data-table';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useFormList } from '@/features/forms/lib/use-form-list';

import { CreateForm } from '../CreateForm';

import { FormListMobileCard } from './form-list-mobile-card';
import { useFormListColumns } from './lib/use-form-list-columns';

export function FormList() {
  const { columns } = useFormListColumns();
  const {
    formList,
    page,
    setPage,
    totalCount,
    pageSize,
    title,
    setTitle,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
  } = useFormList();
  const router = useRouter();

  return (
    <div className="space-y-4">
      <Field orientation="horizontal">
        <CreateForm />
        <Button type="button" onClick={() => router.push('dashboard/results')}>
          Results
        </Button>
      </Field>
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
      {!formList || formList.length === 0 ? (
        <div>No forms yet</div>
      ) : (
        <DataTable
          columns={columns}
          data={formList}
          pageIndex={page}
          setPageIndex={setPage}
          totalCount={totalCount}
          pageSize={pageSize}
          renderMobileRow={(row) => <FormListMobileCard {...row} />}
        />
      )}
    </div>
  );
}
