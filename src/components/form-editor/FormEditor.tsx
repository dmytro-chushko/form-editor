'use client';

import { Puck, Render, useGetPuck } from '@measured/puck';
import { CheckCircleIcon } from '@phosphor-icons/react';
import { MinusCircleIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import '@measured/puck/puck.css';

import { FormContent } from '@/features/forms/forms.schema';
import { useFormCommon } from '@/features/forms/lib/use-form-common';
import { useFormItem } from '@/features/forms/lib/use-form-item';
import { config } from '@/features/puck/puck.config';

import ActionsDropDownMenu from './ActionsDropdownMenu';

export default function FormEditor() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [isFormLoaded, setIsFormLoaded] = useState<boolean>(false);
  const { content, currentForm, onSaveForm, setContent } = useFormItem();
  const { onDelete, onTogglePublish, onCopy } = useFormCommon();
  const [isPreview, setIsPreview] = useState(false);

  const handleDelete = async () => {
    await onDelete(id);
    router.push('/dashboard');
  };

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
              config={config}
              data={currentForm.content}
              onPublish={onSaveForm}
              onChange={setContent}
              overrides={{
                headerActions: () => {
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const getPuck = useGetPuck();
                  const { appState } = getPuck();

                  return (
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center justify-between gap-2">
                        {currentForm.isPublished ? 'Published' : 'Unpublished'}
                        {currentForm.isPublished ? (
                          <CheckCircleIcon
                            className="text-emerald-600"
                            size={32}
                          />
                        ) : (
                          <MinusCircleIcon className="text-red-600" size={32} />
                        )}
                      </span>
                      <ActionsDropDownMenu
                        isPublish={currentForm.isPublished}
                        onPreview={() => setIsPreview(true)}
                        onSave={async () =>
                          await onSaveForm(appState.data as FormContent)
                        }
                        onTogglePublish={async () =>
                          await onTogglePublish(id, !currentForm.isPublished)
                        }
                        onDelete={handleDelete}
                        onCopy={async () => await onCopy(id)}
                      />
                    </div>
                  );
                },
              }}
            />
          )
        )}
      </div>
    </div>
  );
}
