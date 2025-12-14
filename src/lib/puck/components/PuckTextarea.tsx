interface PuckTextareaProps {
  label: string;
  placeholder: string;
}

export default function PuckTextarea({
  label,
  placeholder,
}: PuckTextareaProps) {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <textarea
        placeholder={placeholder}
        className="border rounded w-full px-3 py-2"
      />
    </div>
  );
}
