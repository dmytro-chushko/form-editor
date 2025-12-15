import { useEffect, useState } from 'react';

interface PuckCheckboxProps {
  label: string;
  checked: boolean;
  puckRef: ((element: Element | null) => void) | null;
}

export default function PuckCheckbox({
  label,
  checked,
  puckRef,
}: PuckCheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <div ref={puckRef} className="flex-1">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          className="h-4 w-4"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <span>{label}</span>
      </label>
    </div>
  );
}
