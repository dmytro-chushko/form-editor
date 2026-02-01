'use client';

import { Render } from '@measured/puck';
import { DownloadSimpleIcon } from '@phosphor-icons/react';

import { useFormByToken } from '@/features/forms/lib/use-form-by-token';
import { useFormSubmit } from '@/features/forms/lib/use-form-submit';
import { addMessages } from '@/features/puck/lib/add-messages';
import { convertEmailValidation } from '@/features/puck/lib/comvert-emal-validation';
import { config } from '@/features/puck/puck.config';
import { formatErrorMessage } from '@/lib/utils';

import { FormInputField } from '../form/form-input-field';
import { SharedFormSkeleton } from '../ui/app-skeletons';
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
    onDownloadProgress,
  } = useFormByToken();
  const { onSubmit, isSubmitting } = useFormSubmit();

  if (isFormError) {
    return (
      <LoadError
        message={formatErrorMessage(formError, 'Failed to load form')}
      />
    );
  }

  if (isLoading && !sharedForm) {
    return <SharedFormSkeleton />;
  }

  return (
    <Field className="gap-4 container mx-auto">
      <div className="relative">
        <div className="p-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col">
                <div className="self-center">
                  <Field orientation="horizontal" className="items-end">
                    <FormInputField
                      name="recipientEmail"
                      label="Your Email"
                      placeholder="Input your email"
                      validation={convertEmailValidation(
                        addMessages({
                          required: true,
                          email: true,
                        })
                      )}
                    />
                    <Button
                      type="button"
                      disabled={
                        !email ||
                        !form.formState.isDirty ||
                        isLoading ||
                        isSubmitting
                      }
                      loading={isLoading}
                      onClick={onSaveProgress}
                    >
                      Save progress
                    </Button>
                    <Button
                      type="button"
                      disabled={!email || isLoading || isSubmitting}
                      loading={isLoading}
                      onClick={onDownloadProgress}
                    >
                      <DownloadSimpleIcon size={32} className="size-6" />
                    </Button>
                  </Field>
                </div>
                {sharedForm && (
                  <>
                    <Render config={config} data={sharedForm.content} />
                  </>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Field>
  );
}
