import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Field } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface PuckRadioProps {
  groupLabel: string;
  groupName: string;
  options: { value: string; label: string }[];
  selected: string;
  puckRef: ((element: Element | null) => void) | null;
}

export default function PuckRadio({
  groupLabel,
  groupName,
  options,
  selected,
  puckRef,
}: PuckRadioProps) {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    setValue(groupName, selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Field ref={puckRef} orientation="vertical" className="flex-1">
      <legend className="block font-medium mb-1">{groupLabel}</legend>
      <Controller
        name={groupName}
        control={control}
        render={({ field }) => (
          <RadioGroup value={field.value} onValueChange={field.onChange}>
            {options.map(({ value, label }) => (
              <Field key={value} orientation="horizontal" className="gap-1">
                <RadioGroupItem value={value} id={`${groupName}-${value}`} />
                <Label htmlFor={`${groupName}-${value}`}>{label}</Label>
              </Field>
            ))}
          </RadioGroup>
        )}
      />
    </Field>
  );
}
