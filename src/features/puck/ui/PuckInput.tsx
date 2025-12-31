import { FormInputField } from '@/components/form/FormInputField';

import { ValidationField } from '../types';

interface PuckInputProps {
  name: string;
  label: string;
  placeholder: string;
  validation: ValidationField;
  puckRef: ((element: Element | null) => void) | null;
}

export default function PuckInput({
  puckRef,
  name,
  label,
  validation,
  placeholder,
}: PuckInputProps) {
  return (
    <div ref={puckRef} className="flex-1">
      <FormInputField
        name={name}
        label={label}
        placeholder={placeholder}
        validation={{
          ...validation,
          ...(validation?.email && {
            pattern: /^[a-zA-Z0-0._%+-]+@[a-zA-Z0-0.-]+\.[a-zA-Z]{2,}$/,
          }),
        }}
      />
    </div>
  );
}
