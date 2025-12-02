'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

import { useUpdateNameMutation } from '@/features/profile/profile.api';
import { updateNameSchema } from '@/features/profile/profile.schema';

type FieldKey = 'firstName' | 'lastName';

type Props = {
  label: string;
  field: FieldKey;
  value: string | null | undefined;
  placeholder?: string;
};

export default function EditableField({
  label,
  field,
  value,
  placeholder = '—',
}: Props) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value ?? '');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setText(value ?? '');
  }, [value]);

  const { mutateAsync, isPending } = useUpdateNameMutation();

  const payload = useMemo(() => {
    return field === 'firstName'
      ? { firstName: text.trim() }
      : { lastName: text.trim() };
  }, [field, text]);

  async function save() {
    const trimmed = text.trim();
    const original = (value ?? '').trim();

    if (trimmed === original) {
      setEditing(false);

      return;
    }
    try {
      // validate payload with zod
      updateNameSchema.parse(payload);
      await mutateAsync(payload);
      toast.success('Saved');
      setEditing(false);
    } catch (e: any) {
      const message = e?.message || 'Failed to save';
      toast.error(message);
      // keep editing so user can correct
      inputRef.current?.focus();
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      void save();
    } else if (e.key === 'Escape') {
      setText(value ?? '');
      setEditing(false);
    }
  }

  return (
    <div className="space-y-1">
      <div className="text-xs uppercase text-gray-500">{label}</div>
      {!editing ? (
        <button
          type="button"
          className="text-left text-sm hover:bg-gray-50 rounded px-1 py-0.5"
          onClick={() => setEditing(true)}
        >
          {text ? (
            <span className="text-gray-900">{text}</span>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            className="w-full rounded border px-2 py-1 text-sm outline-none focus:ring"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            onBlur={() => void save()}
            disabled={isPending}
            autoFocus
          />
          <button
            type="button"
            className="rounded bg-gray-900 px-2 py-1 text-xs text-white disabled:opacity-50"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => void save()}
            disabled={isPending}
          >
            {isPending ? 'Saving…' : 'Save'}
          </button>
        </div>
      )}
    </div>
  );
}
