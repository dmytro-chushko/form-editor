import { CheckCircleIcon } from '@phosphor-icons/react/dist/ssr';

export default function ConfirmSubmitPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="mx-auto max-w-md rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <div className="flex flex-col items-center text-center">
          <CheckCircleIcon size={48} className="text-green-600" />
          <h1 className="mt-4 text-xl font-semibold">Form submitted</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Thank you — your response has been recorded.
          </p>
        </div>
      </div>
    </div>
  );
}
