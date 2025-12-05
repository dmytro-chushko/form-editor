'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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

  const form = useForm<{ firstName?: string; lastName?: string }>({
    resolver: zodResolver(updateNameSchema),
    defaultValues:
      field === 'firstName'
        ? { firstName: value ?? '' }
        : { lastName: value ?? '' },
    mode: 'onBlur',
  });

  // sync external value changes
  useEffect(() => {
    if (field === 'firstName') form.reset({ firstName: value ?? '' });
    else form.reset({ lastName: value ?? '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const { mutateAsync, isPending } = useUpdateNameMutation();

  const payload = useMemo(() => {
    const current =
      field === 'firstName'
        ? (form.getValues().firstName ?? '').trim()
        : (form.getValues().lastName ?? '').trim();

    return field === 'firstName'
      ? { firstName: current }
      : { lastName: current };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field, form.watch(field)]);

  async function save() {
    const current =
      field === 'firstName'
        ? (form.getValues().firstName ?? '').trim()
        : (form.getValues().lastName ?? '').trim();
    const original = (value ?? '').trim();

    if (current === original) {
      setEditing(false);

      return;
    }
    try {
      await mutateAsync(payload);
      toast.success('Saved');
      setEditing(false);
    } catch (e: any) {
      const message = e?.message || 'Failed to save';
      toast.error(message);
      // keep editing so user can correct
      form.setFocus(field as any);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      void save();
    } else if (e.key === 'Escape') {
      if (field === 'firstName') form.reset({ firstName: value ?? '' });
      else form.reset({ lastName: value ?? '' });
      setEditing(false);
    }
  }

  return (
    <div className="space-y-1 max-sm:text-center">
      <div className="text-xs uppercase text-gray-500">{label}</div>
      {!editing ? (
        <button
          type="button"
          className="text-left text-sm hover:bg-gray-50 cursor-pointer rounded px-1 py-0.5"
          onClick={() => setEditing(true)}
        >
          {(
            (field === 'firstName'
              ? form.getValues().firstName
              : form.getValues().lastName) || ''
          ).trim() ? (
            <span className="text-gray-600">
              {field === 'firstName'
                ? form.getValues().firstName
                : form.getValues().lastName}
            </span>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </button>
      ) : (
        <Form {...form}>
          <form
            className="flex items-center gap-2"
            onSubmit={form.handleSubmit(() => void save())}
          >
            <FormField
              control={form.control}
              name={field}
              render={({ field: rhf }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...rhf}
                      value={(rhf.value as string) ?? ''}
                      onChange={(e) => rhf.onChange(e.target.value)}
                      onKeyDown={onKeyDown}
                      onBlur={() => form.handleSubmit(() => void save())()}
                      disabled={isPending}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              className="rounded bg-gray-900 px-2 py-1 text-xs text-white disabled:opacity-50"
              onMouseDown={(e) => e.preventDefault()}
              disabled={isPending}
            >
              {isPending ? 'Saving…' : 'Save'}
            </button>
          </form>
        </Form>
      )}
    </div>
  );
}
