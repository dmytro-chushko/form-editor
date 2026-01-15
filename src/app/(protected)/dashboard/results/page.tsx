import { OverviewTable } from '@/components/results/overview-data-table/overview-table';

import { OverviewList } from '@/components/results/overview-list';

export default function ResultsOverviewPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-4 text-2xl font-semibold">Results</h1>
      {/* <OverviewList /> */}
      <OverviewTable />
    </div>
  );
}
