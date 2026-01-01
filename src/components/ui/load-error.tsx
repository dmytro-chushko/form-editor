'use client';

import { WarningCircleIcon } from '@phosphor-icons/react';

export function LoadError({
  message = 'Failed to load data',
}: {
  message?: string;
}) {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-start gap-3 rounded-md border border-destructive/30 bg-destructive/5 p-4">
        <WarningCircleIcon className="text-destructive" size={24} />
        <div>
          <h2 className="font-semibold">Error</h2>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
    </div>
  );
}
