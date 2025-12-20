'use client';

import { Puck, Render } from '@measured/puck';
import { useState } from 'react';

import '@measured/puck/puck.css';
import { useFormItem } from '@/features/forms/lib/use-form-item';
import { config } from '@/features/puck/puck.config';

export default function FormEditor() {
  const { content, currentForm, onPublishForm, setContent, isLoading } =
    useFormItem();
  const [isPreview, setIsPreview] = useState(false);

  return isLoading ? (
    <div>...loading</div>
  ) : (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Редактор форми</h1>

      <div className="border rounded shadow-sm">
        {isPreview ? (
          <div className="relative">
            <div className="flex items-center justify-between border-b px-3 py-2">
              <div className="text-sm text-muted-foreground">Preview</div>
              <button
                type="button"
                className="rounded bg-gray-900 px-3 py-1 text-xs text-white"
                onClick={() => setIsPreview(false)}
              >
                Back to editor
              </button>
            </div>
            <div className="p-3">
              <Render config={config} data={content} />
            </div>
          </div>
        ) : (
          currentForm && (
            <Puck
              key={`${currentForm?.id ?? 'new'}:${currentForm?.updatedAt ?? ''}`}
              config={config}
              data={currentForm.content}
              onPublish={onPublishForm}
              onChange={setContent}
              overrides={{
                // Add a Preview button next to default Publish button
                headerActions: ({ children }) => (
                  <>
                    {children}
                    <button
                      type="button"
                      className="ml-2 rounded bg-gray-900 px-3 py-1 text-xs text-white"
                      onClick={() => setIsPreview(true)}
                    >
                      Preview
                    </button>
                  </>
                ),
              }}
            />
          )
        )}
      </div>
    </div>
  );
}
