interface PuckSelectProps {
  label: string;
  options: { value: string; label: string }[];
}

export default function PuckSelect({ label, options }: PuckSelectProps) {
  return (
    <div className="mb-4">
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
