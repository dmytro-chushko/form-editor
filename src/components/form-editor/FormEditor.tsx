'use client';

import { Puck } from '@measured/puck';
import { useEffect, useState } from 'react';
import '@measured/puck/puck.css';
import { useForm } from 'react-hook-form';

import { useFormItem } from '@/features/forms/lib/use-form-item';
import { config } from '@/features/puck/puck.config';
import { ROUTES } from '@/lib/constants/routes';

import { FormEditorSkeleton } from '../ui/app-skeletons';
import BackButton from '../ui/back-button';
import { Field } from '../ui/field';
import { Form } from '../ui/form';

import FormPreview from './FormPreview';
import HeaderActions from './HeaderActions';

export default function FormEditor() {
  const [isFormLoaded, setIsFormLoaded] = useState<boolean>(false);
  const form = useForm();
  const { content, currentForm, onSaveForm, setContent } = useFormItem();
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    if (currentForm) setIsFormLoaded(true);
  }, [currentForm]);

  if (!isFormLoaded) {
    return <FormEditorSkeleton />;
  }

  return (
    <div
      className="flex flex-col h-full w-full
      md:p-6 space-y-4
    [--puck-color-white:--background]
    [--puck-color-black:--foreground]
    [--puck-color-grey-09:var(--border)!important]
    [--puck-color-grey-11:--accent]
    [--puck-color-grey-12:--muted]
    [&_option]:!text-black
    [&_option]:dark:!text-black 
    "
    >
      <Field orientation="horizontal" className="items-center">
        <BackButton backTo={ROUTES.Dashboard} />
        <h1 className="text-2xl font-semibold">Form editor</h1>
      </Field>

      <div className="border rounded shadow-sm">
        <Form {...form}>
          {isPreview ? (
            <FormPreview
              content={content}
              config={config}
              onClose={setIsPreview}
            />
          ) : (
            currentForm && (
              <Puck
                config={config}
                data={currentForm.content}
                onPublish={onSaveForm}
                onChange={setContent}
                overrides={{
                  headerActions: () => (
                    <HeaderActions
                      isPublished={currentForm.isPublished}
                      onPreview={() => setIsPreview(true)}
                      onSave={onSaveForm}
                    />
                  ),
                  preview: ({ children }) => (
                    <form
                      onSubmit={form.handleSubmit((data) => console.warn(data))}
                      className="h-full"
                    >
                      {children}
                    </form>
                  ),
                }}
              />
            )
          )}
        </Form>
      </div>
    </div>
  );
}
