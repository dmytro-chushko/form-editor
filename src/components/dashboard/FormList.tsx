'use client';

import { useFormsApi } from '@/features/forms/lib/use-api-forms';

import { CreateForm } from './CreateForm';
import { FormTable } from './FormTable';

export function FormList() {
  const { formList } = useFormsApi();

  return (
    <div>
      <CreateForm />
      {formList && <FormTable forms={formList} />}
    </div>
  );
}
