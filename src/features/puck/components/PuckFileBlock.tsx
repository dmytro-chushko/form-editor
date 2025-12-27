'use client';

import { FileArrowUpIcon } from '@phosphor-icons/react';
import { Controller, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAddFile } from '@/features/forms/lib/use-upload-file';

interface PuckFileBlockProps {
  name: string;
  label: string;
  puckRef: ((element: Element | null) => void) | null;
}

export default function PuckFileBlock({
  name,
  label,
  puckRef,
}: PuckFileBlockProps) {
  const { inputRef, handleOpenPicker, addedFileName, handleAddFile } =
    useAddFile();
  const { control } = useFormContext();

  return (
    <div ref={puckRef} className="flex-1">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Field>
            <Label htmlFor={name}>{label}</Label>
            <div className="flex items-center gap-2 bg-foreground w-32 rounded-md text-background p-2 justify-between">
              <Input
                ref={inputRef}
                value={field.value}
                type="file"
                hidden
                onChange={(e) => {
                  handleAddFile(e);
                  field.onChange(field.value);
                }}
              />
              <div>{addedFileName}</div>
              <Button type="button" size="icon" onClick={handleOpenPicker}>
                <FileArrowUpIcon size={32} />
              </Button>
            </div>
          </Field>
        )}
      />
    </div>
  );
}
