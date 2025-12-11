'use client';

import { Puck } from '@measured/puck';
import { useState } from 'react';
import '@measured/puck/puck.css';

type FormContent = any;

const config = {
  components: {
    Input: {
      fields: {
        label: { type: 'text' },
        placeholder: { type: 'text' },
      },
      render: ({ label, placeholder }: any) => (
        <div className="mb-4">
          <label className="block font-medium mb-1">{label}</label>
          <input
            placeholder={placeholder}
            className="border rounded w-full px-3 py-2"
          />
        </div>
      ),
    },

    Textarea: {
      fields: {
        label: { type: 'text' },
        placeholder: { type: 'text' },
      },
      render: ({ label, placeholder }: any) => (
        <div className="mb-4">
          <label className="block font-medium mb-1">{label}</label>
          <textarea
            placeholder={placeholder}
            className="border rounded w-full px-3 py-2"
          />
        </div>
      ),
    },

    Select: {
      fields: {
        label: { type: 'text' },
        options: { type: 'text' }, // через кому
      },
      render: ({ label, options }: any) => (
        <div className="mb-4">
          <label className="block font-medium mb-1">{label}</label>
          <select className="border rounded w-full px-3 py-2">
            {options.split(',').map((o: string) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      ),
    },
  },
};

const initialContent: FormContent = {
  content: [],
};

export default function FormEditor() {
  const [content, setContent] = useState<FormContent>(initialContent);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Редактор форми</h1>

      <div className="border rounded shadow-sm">
        <Puck config={config} data={content} onPublish={setContent} />
      </div>
    </div>
  );
}
