'use client';

import { Puck, Render } from '@measured/puck';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import '@measured/puck/puck.css';
import { config } from '@/features/puck/puck.config';

type FormContent = any;

const initialContent: FormContent = {
  content: [],
};

export default function FormEditor() {
  const [content, setContent] = useState<FormContent>(initialContent);
  const [isPreview, setIsPreview] = useState(false);

  return (
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
          <Puck
            config={config}
            data={content}
            onPublish={setContent}
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
        )}
      </div>
    </div>
  );
}
