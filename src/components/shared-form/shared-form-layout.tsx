'use client';

import { Render } from '@measured/puck';

import { useFormByToken } from '@/features/forms/lib/use-form-by-token';
import { config } from '@/features/puck/puck.config';
import { formatErrorMessage } from '@/lib/utils';

import { Field } from '../ui/field';
import { Form } from '../ui/form';
import { LoadError } from '../ui/load-error';

export function SharedFormLayout() {
  const { form, sharedForm, isLoading, isError, error } = useFormByToken();

  if (isError) {
    return (
      <LoadError message={formatErrorMessage(error, 'Failed to load form')} />
    );
  }

  return isLoading && !sharedForm ? (
    <div>...loading</div>
  ) : (
    <Field className="gap-4 container mx-auto">
      <div className="relative">
        <div className="p-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => console.warn(data))}>
              {sharedForm && (
                <Render config={config} data={sharedForm.content} />
              )}
            </form>
          </Form>
        </div>
      </div>
    </Field>
  );
}
