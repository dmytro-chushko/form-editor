import { FormInputField } from '@/components/form/form-input-field';

import { addMessages } from '../lib/add-messages';
import { convertEmailValidation } from '../lib/comvert-emal-validation';
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
    <div
      ref={puckRef}
      className="flex-1"
      onKeyDownCapture={(e) => {
        e.stopPropagation();
      }}
      onKeyUpCapture={(e) => {
        e.stopPropagation();
      }}
    >
      <FormInputField
        name={name}
        label={label}
        placeholder={placeholder}
        validation={convertEmailValidation(addMessages(validation))}
      />
    </div>
  );
}
