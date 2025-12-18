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
      <label className="block font-medium">{label}</label>
      <input
        placeholder={placeholder}
        className="w-full border border-foreground rounded px-3 py-2"
      />
    </div>
  );
}
