'use client';

import { useState } from 'react';

import { DataTable } from '@/components/ui/data-table';
import { useGetResultsOverview } from '@/features/results/results.api';

import { columns } from './overview-columns';
import { OverviewMobileCard } from './overview-mobile-card';

export function OverviewTable() {
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const { data, isLoading } = useGetResultsOverview(page, pageSize);

  if (isLoading) return <div>Loading…</div>;

  if (!data || data.items.length === 0) return <div>No forms yet</div>;

  const totalPages = Math.max(1, Math.ceil(data.total / data.pageSize));

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data?.items}
        renderMobileRow={(row: (typeof data.items)[number]) => (
          <OverviewMobileCard {...row} />
        )}
      />
    </div>
  );
}
