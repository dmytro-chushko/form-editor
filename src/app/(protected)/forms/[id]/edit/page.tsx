import { Suspense } from 'react';

import FormEditor from '@/components/form-editor/form-editor';
import { FormEditorSkeleton } from '@/components/ui/app-skeletons';

export default async function FormEditPage() {
  return (
    <Suspense fallback={<FormEditorSkeleton />}>
      <FormEditor />
    </Suspense>
  );
}
