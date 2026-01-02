import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import { addMessages } from '../lib/add-messages';
import { ValidationField } from '../types';

interface PuckTextareaProps {
  label: string;
  placeholder: string;
  rows: number;
  defaultValue: string;
  name: string;
  puckRef: ((element: Element | null) => void) | null;
  validation: ValidationField;
}

export default function PuckTextarea({
  label,
  placeholder,
  rows,
  puckRef,
  defaultValue,
  name,
  validation,
}: PuckTextareaProps) {
  const { control } = useFormContext();

  return (
    <div
      ref={puckRef}
      className="flex-1"
      onKeyDownCapture={(e) => e.stopPropagation()}
      onKeyUpCapture={(e) => e.stopPropagation()}
    >
      <FormField
        name={name}
        control={control}
        rules={addMessages(validation)}
        defaultValue={defaultValue}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                id="form-rhf-textarea-about"
                placeholder={placeholder}
                rows={rows}
                className="min-h-[120px] w-full px-3 py-2"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
