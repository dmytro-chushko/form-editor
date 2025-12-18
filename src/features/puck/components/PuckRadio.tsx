interface PuckRadioProps {
  groupLabel: string;
  groupName: string;
  options: { value: string; label: string }[];
  selected: string;
  puckRef: ((element: Element | null) => void) | null;
}

export default function PuckRadio({
  groupLabel,
  groupName,
  options,
  selected,
  puckRef,
}: PuckRadioProps) {
  return (
    <div ref={puckRef} className="flex-1">
      <fieldset className="">
        <legend className="block font-medium mb-1">{groupLabel}</legend>
        <div className="flex flex-col gap-2">
          {options.map(({ value, label }) => (
            <label key={value} className="inline-flex items-center gap-2">
              <input
                type="radio"
                name={groupName}
                value={value}
                defaultChecked={value === selected}
                className="h-4 w-4"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
