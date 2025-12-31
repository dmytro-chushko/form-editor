'use client';

import { HTMLInputTypeAttribute } from 'react';
import { useFormContext, ValidationRule } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ValidationField } from '@/features/puck/types';

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
  disabled?: boolean;
  validation?: ValidationField & { pattern?: ValidationRule<RegExp> };
};

export function FormInputField({
  name,
  label,
  placeholder,
  type = 'text',
  autoComplete,
  validation,
  disabled,
}: Props) {
  const form = useFormContext();

  return (
    <FormField
      control={form?.control}
      name={name}
      rules={validation}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
