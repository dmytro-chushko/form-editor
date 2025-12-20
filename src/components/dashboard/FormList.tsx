'use client';

import { useFormList } from '@/features/forms/lib/use-form-list';

import { CreateForm } from './CreateForm';
import { FormTable } from './FormTable';

export function FormList() {
  const { formList } = useFormList();

  return (
    <div>
      <CreateForm />
      {formList && <FormTable forms={formList} />}
    </div>
  );
}
