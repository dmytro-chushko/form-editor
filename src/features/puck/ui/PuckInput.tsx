import { FormInputField } from '@/components/form/FormInputField';

interface PuckInputProps {
  name: string;
  label: string;
  placeholder: string;
  puckRef: ((element: Element | null) => void) | null;
}

export default function PuckInput({
  puckRef,
  name,
  label,
  placeholder,
}: PuckInputProps) {
  return (
    <div ref={puckRef} className="flex-1">
      <FormInputField name={name} label={label} placeholder={placeholder} />
    </div>
  );
}
