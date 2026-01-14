'use client';

import { DataTable } from '@/components/ui/data-table';
import { useResults } from '@/features/results/lib/use-results';

import { columns } from './form-details-columns';

export function FormDetailsTable() {
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
    from,
    setFrom,
    to,
    setTo,
  } = useResults();

  return (
    <div className="space-y-3">
      {' '}
      {!formResults || formResults.length === 0 ? (
        <div>No forms yet</div>
      ) : (
        <DataTable
          columns={columns(contentDataArray)}
          data={formResults}
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
