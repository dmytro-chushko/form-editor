import { FormResultsTable } from '@/components/results/form-results-table';

export default function FormResultsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-4 text-2xl font-semibold">Form results</h1>
      <FormResultsTable />
    </div>
  );
}
