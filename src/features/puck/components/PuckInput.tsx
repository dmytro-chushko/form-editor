import { FormInputField } from '@/components/form/FormInputField';

interface PuckInputProps {
  label: string;
  placeholder: string;
  puckRef: ((element: Element | null) => void) | null;
}

export default function PuckInput({
  puckRef,
  label,
  placeholder,
}: PuckInputProps) {
  return (
    <div ref={puckRef} className="flex-1">
      <FormInputField name={label} label={label} placeholder={placeholder} />
    </div>
  );
}
