'use client';

import { useRouter } from 'next/navigation';

import { useFormList } from '@/features/forms/lib/use-form-list';

import { Button } from '../ui/button';
import { Field } from '../ui/field';

import { CreateForm } from './CreateForm';
import { FormTable } from './FormTable';

export function FormList() {
  const { formList } = useFormList();
  const router = useRouter();

  return (
    <div>
      <Field orientation="horizontal">
        <CreateForm />
        <Button type="button" onClick={() => router.push('dashboard/results')}>
          Results
        </Button>
      </Field>
      {formList && <FormTable forms={formList} />}
    </div>
  );
}
