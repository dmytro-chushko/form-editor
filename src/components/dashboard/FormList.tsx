'use client';

import { useGetForms } from '@/features/forms/use-get-forms';

import { CreateForm } from './CreateForm';
import { FormTable } from './FormTable';

export function FormList() {
  const { formList } = useGetForms();

  return (
    <div>
      <CreateForm />
      {formList && <FormTable forms={formList} />}
    </div>
  );
}
