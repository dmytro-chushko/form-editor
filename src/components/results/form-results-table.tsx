'use client';

import { useResults } from '@/features/results/lib/use-results';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export function FormResultsTable() {
  const {
    formResults,
    isLoading,
    page,
    setPage,
    totalPages,
    email,
    setEmail,
    from,
    setFrom,
    to,
    setTo,
  } = useResults();

  return (
    <div className="space-y-3">
      {/* Фільтри */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <div className="sm:w-64">
          <label className="block text-sm mb-1">Email</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
          />
        </div>
        <div className="sm:w-56">
          <label className="block text-sm mb-1">From (ISO)</label>
          <Input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="2026-01-01T00:00:00Z"
          />
        </div>
        <div className="sm:w-56">
          <label className="block text-sm mb-1">To (ISO)</label>
          <Input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="2026-01-31T23:59:59Z"
          />
        </div>
        <Button type="button" variant="outline" onClick={() => setPage(1)}>
          Apply
        </Button>
      </div>

      {/* Таблиця */}
      <div className="overflow-x-auto rounded-md border max-sm:hidden">
        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead className="hidden sm:table-cell">
                Submitted at
              </TableHead>
              <TableHead>Content (JSON)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || !formResults ? (
              <TableRow>
                <TableCell colSpan={3}>Loading…</TableCell>
              </TableRow>
            ) : formResults.items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>No results</TableCell>
              </TableRow>
            ) : (
              formResults.items.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="whitespace-nowrap">
                    {r.userEmail}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell whitespace-nowrap">
                    {r.submittedAt ?? ''}
                  </TableCell>
                  <TableCell className="max-w-[420px] truncate">
                    {r.content ? JSON.stringify(r.content) : ''}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile card view */}
      <div className="sm:hidden space-y-3">
        {formResults?.items.map((r) => (
          <div key={r.id} className="rounded-md border p-3">
            <div className="text-sm">{r.userEmail}</div>
            <div className="text-xs text-muted-foreground">
              {r.submittedAt ?? ''}
            </div>
            <div className="mt-1 text-xs break-words">
              {r.content ? JSON.stringify(r.content) : ''}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end">
        <div className="text-sm text-muted-foreground">
          Page {formResults?.page ?? page} / {totalPages} •{' '}
          {formResults?.total ?? 0} total
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
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
    </div>
  );
}
