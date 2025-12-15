interface PuckSelectProps {
  label: string;
  options: { value: string; label: string }[];
  puckRef: ((element: Element | null) => void) | null;
}

export default function PuckSelect({
  puckRef,
  label,
  options,
}: PuckSelectProps) {
  return (
    <div ref={puckRef} className="flex-1">
      <label className="block font-medium mb-1">{label}</label>
      <select className="border rounded w-full px-3 py-2">
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
