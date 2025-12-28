import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PuckSelectProps {
  name: string;
  label: string;
  placeholder: string;
  defaultValue: string;
  options: { value: string; label: string }[];
  puckRef: ((element: Element | null) => void) | null;
}

export default function PuckSelect({
  puckRef,
  name,
  label,
  defaultValue,
  placeholder,
  options,
}: PuckSelectProps) {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    setValue(name, defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={puckRef} className="flex-1">
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            name={field.name}
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger id={name} className="min-w-[120px]">
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
        )}
      />
    </div>
  );
}
