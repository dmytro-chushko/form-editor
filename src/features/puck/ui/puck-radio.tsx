import { useFormContext } from 'react-hook-form';

import { Field } from '@/components/ui/field';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { addMessages } from '../lib/add-messages';
import { ValidationField } from '../types';

interface PuckRadioProps {
  groupLabel: string;
  groupName: string;
  options: { value: string; label: string }[];
  selected: string;
  puckRef: ((element: Element | null) => void) | null;
  validation: ValidationField;
}

export default function PuckRadio({
  groupLabel,
  groupName,
  options,
  selected,
  puckRef,
  validation,
}: PuckRadioProps) {
  const { control, formState } = useFormContext();

  return (
    <Field ref={puckRef} orientation="vertical" className="flex-1">
      <FormField
        name={groupName}
        control={control}
        rules={addMessages(validation)}
        defaultValue={selected}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="block font-medium mb-1">
              {groupLabel}
            </FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value || ''}
                onValueChange={field.onChange}
                aria-invalid={!!formState.errors?.[groupName]}
              >
                {options.map(({ value, label }) => (
                  <Field key={value} orientation="horizontal" className="gap-1">
                    <RadioGroupItem
                      value={value}
                      id={`${groupName}-${value}`}
                      aria-invalid={!!formState.errors?.[groupName]}
                    />
                    <FormLabel htmlFor={`${groupName}-${value}`}>
                      {label}
                    </FormLabel>
                  </Field>
                ))}
              </RadioGroup>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </Field>
  );
}
