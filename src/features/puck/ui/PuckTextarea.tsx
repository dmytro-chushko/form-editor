import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';

interface PuckTextareaProps {
  label: string;
  placeholder: string;
  rows: number;
  defaultValue: string;
  name: string;
  puckRef: ((element: Element | null) => void) | null;
}

export default function PuckTextarea({
  label,
  placeholder,
  rows,
  puckRef,
  defaultValue,
  name,
}: PuckTextareaProps) {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    setValue(name, defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={puckRef} className="flex-1">
      <FieldLabel>{label}</FieldLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            id="form-rhf-textarea-about"
            placeholder={placeholder}
            rows={rows}
            className="min-h-[120px] w-full px-3 py-2"
          />
        )}
      />
    </div>
  );
}
