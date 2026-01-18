import { OverviewTable } from '@/components/results/overview-data-table/overview-table';

export default function ResultsOverviewPage() {
  return (
    <div className="container mx-auto py-6 space-y-4">
      <h1 className="text-2xl font-semibold">Results</h1>
      <OverviewTable />
    </div>
  );
}
