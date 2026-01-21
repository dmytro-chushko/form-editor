import { FormDetailsTable } from '@/components/results/form-details-table.tsx/form-details-table';
import BackButton from '@/components/ui/back-button';
import { Field } from '@/components/ui/field';

export default function FormResultsPage() {
  return (
    <div className="container mx-auto py-6 space-y-4">
      <Field orientation="horizontal" className="items-center">
        <BackButton backTo="/dashboard/results" />
        <h1 className=" text-2xl font-semibold">Form results</h1>
      </Field>
      <FormDetailsTable />
    </div>
  );
}
