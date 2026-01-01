import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { addMessages } from '../lib/add-messages';
import { ValidationField } from '../types';

interface PuckSelectProps {
  name: string;
  label: string;
  placeholder: string;
  defaultValue: string;
  options: { value: string; label: string }[];
  puckRef: ((element: Element | null) => void) | null;
  validation: ValidationField;
}

export default function PuckSelect({
  puckRef,
  name,
  label,
  defaultValue,
  placeholder,
  options,
  validation,
}: PuckSelectProps) {
  const { control, setValue, formState } = useFormContext();

  useEffect(() => {
    setValue(name, defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <FormControl>
              <Select
                name={field.name}
                value={field.value || ''}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id={name}
                  className="min-w-[120px]"
                  aria-invalid={!!formState?.errors?.[name]}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map(({ value, label }) => (
                    <SelectItem key={`${name}-${value}`} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
