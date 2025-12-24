import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldLabel } from '@/components/ui/field';

interface PuckCheckboxProps {
  name: string;
  label: string;
  checked: boolean;
  puckRef: ((element: Element | null) => void) | null;
}

export default function PuckCheckbox({
  name,
  label,
  checked,
  puckRef,
}: PuckCheckboxProps) {
  const { control } = useFormContext();
  const currentField = useWatch({ control, name, defaultValue: checked });

  return (
    <div ref={puckRef} className="flex-1">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Field>
            <Checkbox
              id={field.name}
              name={field.name}
              checked={currentField}
              onCheckedChange={field.onChange}
            />
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          </Field>
        )}
      />
    </div>
  );
}
