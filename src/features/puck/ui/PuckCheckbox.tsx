import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

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
  const { control, setValue } = useFormContext();

  useEffect(() => {
    setValue(name, checked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={puckRef} className="flex-1">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Field orientation="horizontal">
            <Checkbox
              id={field.name}
              name={field.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          </Field>
        )}
      />
    </div>
  );
}
