import { useFormContext } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { Field } from '@/components/ui/field';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { addMessages } from '../lib/add-messages';
import { ValidationField } from '../types';

interface PuckCheckboxProps {
  name: string;
  label: string;
  checked: boolean;
  puckRef: ((element: Element | null) => void) | null;
  validation: ValidationField;
}

export default function PuckCheckbox({
  name,
  label,
  checked,
  puckRef,
  validation,
}: PuckCheckboxProps) {
  const { control } = useFormContext();

  return (
    <div ref={puckRef} className="flex-1">
      <FormField
        name={name}
        control={control}
        rules={addMessages(validation)}
        defaultValue={checked}
        render={({ field }) => (
          <FormItem>
            <Field orientation="horizontal">
              <Checkbox
                id={field.name}
                name={field.name}
                checked={field.value || false}
                onCheckedChange={field.onChange}
              />
              <FormLabel htmlFor={field.name}>{label}</FormLabel>
            </Field>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
