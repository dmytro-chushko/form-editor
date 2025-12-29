'use client';

import { Render } from '@measured/puck';

import { useFormByToken } from '@/features/forms/lib/use-form-by-token';
import { config } from '@/features/puck/puck.config';

import { Field } from '../ui/field';
import { Form } from '../ui/form';

export function SharedFormLayout() {
  const { form, sharedForm, isLoading } = useFormByToken();

  return isLoading && !sharedForm ? (
    <div>...loading</div>
  ) : (
    <Field className="gap-4 container mx-auto">
      <div className="relative">
        <div className="flex items-center justify-between border-b px-3 py-2">
          <div className="text-sm text-muted-foreground">Preview</div>
        </div>
        <div className="p-3">
          <Form {...form}>
            <form>
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
