'use client';

import { DownloadIcon } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import { exportResults } from '@/features/results/lib/export-results';

interface ResultExportssProps {
  exportRoute: string;
  filters: Record<string, string | undefined>;
}

export function ResultExports({ exportRoute, filters }: ResultExportssProps) {
  const handleExport = (format: 'xlsx' | 'csv') => {
    exportResults(exportRoute, filters, format);
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={() => handleExport('xlsx')}>
        <DownloadIcon size={16} className="mr-2" /> Excel
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
        <DownloadIcon size={16} className="mr-2" /> CSV
      </Button>
    </div>
  );
}
