'use client';

import { Config, Puck, Render } from '@measured/puck';
import { ReactNode, useState } from 'react';
import '@measured/puck/puck.css';

type FormContent = any;
type RootProps = {
  children: ReactNode;
};

const config: Config<object, RootProps> = {
  categories: {
    ['TEXT FIELDS']: {
      components: ['Input', 'Textarea'],
    },
    ['SELECT FIELDS']: {
      components: ['Select'],
    },
    ['CHOICE FIELDS']: {
      components: ['Checkbox', 'Radio'],
    },
    ['LAYOUT']: {
      components: ['Flex'],
    },
  },
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
            className="border rounded w-3/4 px-3 py-2 bg-gray-100"
          />
        </div>
      ),
    },
    Checkbox: {
      fields: {
        label: { type: 'text' },
        checked: {
          type: 'radio',
          options: [
            { label: 'True', value: true },
            { label: 'False', value: false },
          ],
        },
      },
      defaultProps: {
        label: 'I agree',
        checked: false,
      },
      render: ({ label, checked }: any) => (
        <label className="mb-4 flex items-center gap-2">
          <input type="checkbox" checked={checked} className="h-4 w-4" />
          <span>{label}</span>
        </label>
      ),
    },
    Radio: {
      fields: {
        groupLabel: { type: 'text' },
        name: { type: 'text' },
        options: { type: 'text' }, // comma-separated values
        selected: { type: 'text' },
      },
      defaultProps: {
        groupLabel: 'Choose one',
        name: 'radio-group',
        options: 'Option A,Option B,Option C',
        selected: 'Option A',
      },
      render: ({ groupLabel, name, options, selected }: any) => {
        const opts = String(options || '')
          .split(',')
          .map((o: string) => o.trim())
          .filter(Boolean);

        return (
          <fieldset className="mb-4">
            <legend className="block font-medium mb-1">{groupLabel}</legend>
            <div className="flex flex-col gap-2">
              {opts.map((opt: string) => (
                <label key={opt} className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name={name}
                    value={opt}
                    defaultChecked={opt === selected}
                    className="h-4 w-4"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </fieldset>
        );
      },
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
      defaultProps: {
        label: 'Select',
        options: 'Option A,Option B,Option C',
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
    Flex: {
      fields: {
        content: {
          type: 'slot',
        },
        direction: {
          type: 'radio',
          options: [
            { label: 'Row', value: 'row' },
            { label: 'Column', value: 'column' },
          ],
        },
        gap: { type: 'number', min: 0, max: 64, step: 1 },
        justify: {
          type: 'select',
          options: [
            { label: 'Start', value: 'flex-start' },
            { label: 'Center', value: 'center' },
            { label: 'End', value: 'flex-end' },
            { label: 'Space Between', value: 'space-between' },
            { label: 'Space Around', value: 'space-around' },
            { label: 'Space Evenly', value: 'space-evenly' },
          ],
        },
        align: {
          type: 'select',
          options: [
            { label: 'Stretch', value: 'stretch' },
            { label: 'Start', value: 'flex-start' },
            { label: 'Center', value: 'center' },
            { label: 'End', value: 'flex-end' },
            { label: 'Baseline', value: 'baseline' },
          ],
        },
        wrap: {
          type: 'radio',
          options: [
            { label: 'True', value: true },
            { label: 'False', value: false },
          ],
        },
      },
      defaultProps: {
        direction: 'row',
        gap: 8,
        justify: 'flex-start',
        align: 'stretch',
        wrap: false,
      },
      // Container wrapper to place other fields/components inside
      // Puck will provide `children` when used as a container in the editor

      render: ({
        direction,
        gap,
        justify,
        align,
        wrap,
        content: Content,
      }: any) => (
        <div
          className={`mb-4 flex min-h-10 ${direction === 'column' ? 'flex-col' : 'flex-row'} ${
            wrap ? 'flex-wrap' : 'flex-nowrap'
          }`}
          style={{
            gap: typeof gap === 'number' ? `${gap}px` : gap,
            justifyContent: justify,
            alignItems: align,
          }}
        >
          {/* Render nested children dropped inside this container in the editor */}
          {/* Puck typically injects children directly; fall back to Render if needed */}
          <Content />
        </div>
      ),
    },
  },
  root: {
    render: ({ children }) => {
      return <div className="h-full bg-background">{children}</div>;
    },
  },
};

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
