'use client';

import { Render } from '@measured/puck';
import { useEffect } from 'react';

import { useFormByToken } from '@/features/forms/lib/use-form-by-token';
import { useFormSubmit } from '@/features/forms/lib/use-form-submit';
import { addMessages } from '@/features/puck/lib/add-messages';
import { convertEmailValidation } from '@/features/puck/lib/comvert-emal-validation';
import { config } from '@/features/puck/puck.config';
import { formatErrorMessage } from '@/lib/utils';

import { FormInputField } from '../form/FormInputField';
import { Button } from '../ui/button';
import { Field } from '../ui/field';
import { Form } from '../ui/form';
import { LoadError } from '../ui/load-error';

export function SharedFormLayout() {
  const {
    form,
    email,
    sharedForm,
    onSaveProgress,
    isLoading,
    isFormError,
    formError,
  } = useFormByToken();
  const { onSubmit, isSubmitting } = useFormSubmit();

  useEffect(() => {
    document
      .querySelectorAll('button')
      .forEach((item) => item.disabled === isSubmitting);
  }, [isSubmitting]);

  if (isFormError) {
    return (
      <LoadError
        message={formatErrorMessage(formError, 'Failed to load form')}
      />
    );
  }

  return isLoading && !sharedForm ? (
    <div>...loading</div>
  ) : (
    <Field className="gap-4 container mx-auto">
      <div className="relative">
        <div className="p-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col">
                <div className="self-center">
                  <Field orientation="horizontal">
                    <FormInputField
                      name="recepientEmail"
                      label="Your Email"
                      placeholder="Input your email"
                      autoComplete="email"
                      validation={convertEmailValidation(
                        addMessages({
                          required: true,
                          email: true,
                        })
                      )}
                    />
                    <Button
                      type="button"
                      disabled={!email}
                      onClick={onSaveProgress}
                    >
                      Save progress
                    </Button>
                  </Field>
                </div>
                {sharedForm && (
                  <Render config={config} data={sharedForm.content} />
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Field>
  );
}
