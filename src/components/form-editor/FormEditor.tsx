'use client';

import { Puck } from '@measured/puck';
import { useEffect, useState } from 'react';
import '@measured/puck/puck.css';
import { useForm } from 'react-hook-form';

import { useFormItem } from '@/features/forms/lib/use-form-item';
import { config } from '@/features/puck/puck.config';

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

  return !isFormLoaded ? (
    <div>...loading</div>
  ) : (
    <div
      className="p-6 
    [--puck-color-white:--background]
    [--puck-color-black:--foreground]
    [--puck-color-grey-09:var(--border)!important]
    [--puck-color-grey-11:--accent]
    [--puck-color-grey-12:--muted] 
    "
    >
      <h1 className="text-2xl font-semibold mb-4">Редактор форми</h1>

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
