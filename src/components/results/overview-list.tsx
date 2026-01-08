'use client';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetResultsOverview } from '@/features/results/results.api';

export function OverviewList() {
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const { data, isLoading } = useGetResultsOverview(page, pageSize);

  if (isLoading) return <div>Loading…</div>;

  if (!data || data.items.length === 0) return <div>No forms yet</div>;

  const totalPages = Math.max(1, Math.ceil(data.total / data.pageSize));

  return (
    <Card className="p-4 space-top space-x">
      <div className="overflow-x-auto rounded-md border">
        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Title</TableHead>
              <TableHead className="hidden sm fille">Created</TableHead>
              <TableHead>Submissions</TableHead>
              <TableHead className="hidden md:table-body">Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.map((f) => (
              <TableRow key={f.id}>
                <TableCell className="truncate">{f.title}</TableCell>
                <TableCell className="hidden sm:table-cell whitespace-nowrap">
                  {new Date(f.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{f.submissionsCount}</TableCell>
                <TableCell className="hidden md:table-cell whitespace-nowrap">
                  {new Date(f.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/dashboard/results/${f.id}`}>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end">
        <div className="text-sm text-muted-foreground">
          Page {data.page} / {totalPages} • {data.total} total
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}
