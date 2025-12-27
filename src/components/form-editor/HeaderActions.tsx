'use client';

import { useGetPuck } from '@measured/puck';
import { CheckCircleIcon, MinusCircleIcon } from '@phosphor-icons/react';
import { useParams, useRouter } from 'next/navigation';

import { useFormCommon } from '@/features/forms/lib/use-form-common';
import {
  FormContent,
  FormContentSchema,
} from '@/features/forms/model/forms.schema';

import ActionsDropDownMenu from './ActionsDropdownMenu';

interface HeaderActionsPros {
  isPublished: boolean;
  onPreview: () => void;
  onSave: (data: FormContentSchema) => Promise<void>;
}

export default function HeaderActions({
  isPublished,
  onPreview,
  onSave,
}: HeaderActionsPros) {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const getPuck = useGetPuck();
  const { appState } = getPuck();
  const { onDelete, onTogglePublish, onCopy } = useFormCommon();

  const handleDelete = async () => {
    await onDelete(id);
    router.push('/dashboard');
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <span className="flex items-center justify-between gap-2">
        {isPublished ? 'Published' : 'Unpublished'}
        {isPublished ? (
          <CheckCircleIcon className="text-emerald-600" size={32} />
        ) : (
          <MinusCircleIcon className="text-red-600" size={32} />
        )}
      </span>
      <ActionsDropDownMenu
        isPublish={isPublished}
        onPreview={onPreview}
        onSave={async () => await onSave(appState.data as FormContent)}
        onTogglePublish={async () => await onTogglePublish(id, isPublished)}
        onDelete={handleDelete}
        onCopy={async () => await onCopy(id)}
      />
    </div>
  );
}
