'use client';

import { FileArrowUpIcon } from '@phosphor-icons/react';
import { Controller, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAddFile } from '@/features/forms/lib/use-upload-file';

import { ValidationField } from '../types';

interface PuckFileBlockProps {
  name: string;
  label: string;
  puckRef: ((element: Element | null) => void) | null;
  validation: ValidationField;
}

export default function PuckFileBlock({
  name,
  label,
  puckRef,
  validation,
}: PuckFileBlockProps) {
  const { inputRef, handleOpenPicker, addedFileName, handleAddFile } =
    useAddFile();
  const { control } = useFormContext();

  return (
    <div ref={puckRef} className="flex-1">
      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field }) => (
          <Field>
            <FormItem>
              <Label htmlFor={name}>{label}</Label>
              <FormControl>
                <div className="flex items-center gap-2 bg-foreground  rounded-md text-background p-2 justify-between w-full">
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
              </FormControl>

              <FormMessage />
            </FormItem>
          </Field>
        )}
      />
    </div>
  );
}
