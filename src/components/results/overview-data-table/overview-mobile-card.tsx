'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { ResultsOverviewItem } from '@/features/results/model/results.schema';

export function OverviewMobileCard({
  id,
  title,
  createdAt,
  submissionsCount,
}: Omit<ResultsOverviewItem, 'updatedAt'>) {
  return (
    <div key={id} className="border-b p-3 last:border-b-0">
      <Field orientation="horizontal" className="justify-between">
        <div>
          <Field orientation="horizontal">
            <div className="text-sm font-bold">Title:</div>
            <div className="text-sm">{title}</div>
          </Field>
          <Field orientation="horizontal">
            <div className="text-sm font-bold">Created:</div>
            <div className="text-xs text-muted-foreground">{createdAt}</div>
          </Field>
          <Field orientation="horizontal">
            <div className="text-sm font-bold">Submissions:</div>
            <div className="mt-1 text-xs break-words">{submissionsCount}</div>
          </Field>
        </div>

        <Button asChild size="sm" variant="outline">
          <Link href={`/dashboard/results/${id}`}>View</Link>
        </Button>
      </Field>
    </div>
  );
}
