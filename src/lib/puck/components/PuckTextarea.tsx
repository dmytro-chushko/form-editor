interface PuckTextareaProps {
  label: string;
  placeholder: string;
  rows: number;
  puckRef: ((element: Element | null) => void) | null;
}

export default function PuckTextarea({
  label,
  placeholder,
  rows,
  puckRef,
}: PuckTextareaProps) {
  return (
    <div ref={puckRef} className="flex-1">
      <label className="block font-medium mb-1">{label}</label>
      <textarea
        placeholder={placeholder}
        rows={rows}
        className="border rounded border-foreground w-full px-3 py-2"
      />
    </div>
  );
}
