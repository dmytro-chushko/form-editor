'use client';

import { Field } from '@/components/ui/field';
import { validateResultData } from '@/features/results/lib/validate-result-data';

export function FormDetailsMobileCard({
  id,
  ...rest
}: { id: string } & Record<string, unknown>) {
  const mapData = Object.keys(rest);

  return (
    <div key={id} className="rounded-md border p-3">
      <Field orientation="vertical" className="gap-2">
        {mapData.length > 0 &&
          mapData.map((item) => (
            <Field
              key={item}
              orientation="horizontal"
              className="not-last:border-b not-last:border-b-muted not-last:pb-2 justify-between "
            >
              <div className="text-sm font-bold">
                {item[0].toUpperCase()}
                {item.slice(1)}:
              </div>
              <div className="text-sm">{validateResultData(rest[item])}</div>
            </Field>
          ))}
      </Field>
    </div>
  );
}
