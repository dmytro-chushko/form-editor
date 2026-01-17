'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Field } from '@/components/ui/field';
import { useFormList } from '@/features/forms/lib/use-form-list';

import { CreateForm } from '../CreateForm';

import { useFormListColumns } from './lib/use-form-list-columns';

export function FormList() {
  const { columns } = useFormListColumns();
  const { formList, page, setPage, totalCount, pageSize } = useFormList();
  const router = useRouter();

  return (
    <div>
      <Field orientation="horizontal">
        <CreateForm />
        <Button type="button" onClick={() => router.push('dashboard/results')}>
          Results
        </Button>
      </Field>
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
          // renderMobileRow={(row: (typeof data.items)[number]) => (
          //   <OverviewMobileCard {...row} />
          // )}
        />
      )}
    </div>
  );
}
