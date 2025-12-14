interface PuckCheckboxProps {
  label: string;
  checked: boolean;
}

export default function PuckCheckbox({ label, checked }: PuckCheckboxProps) {
  return (
    <label className="mb-4 flex items-center gap-2">
      <input type="checkbox" checked={checked} className="h-4 w-4" />
      <span>{label}</span>
    </label>
  );
}
