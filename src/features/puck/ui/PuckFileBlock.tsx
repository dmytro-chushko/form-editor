'use client';

import { FileArrowUpIcon } from '@phosphor-icons/react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAddFile } from '@/features/forms/lib/use-upload-file';

import { addMessages } from '../lib/add-messages';
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
      <FormField
        name={name}
        control={control}
        rules={addMessages(validation)}
        render={({ field }) => (
          <Field>
            <FormItem>
              <FormLabel htmlFor={name}>{label}</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2 bg-foreground  rounded-md text-background p-2 justify-between w-full">
                  <Input
                    ref={inputRef}
                    type="file"
                    hidden
                    onChange={(e) => {
                      handleAddFile(e);
                      field.onChange(e.target.files?.[0] ?? null);
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
