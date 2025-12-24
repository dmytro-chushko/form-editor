import { Render } from '@measured/puck';

import { FormContent } from '@/features/forms/forms.schema';
import { PuckConfig } from '@/features/puck/puck.config';

interface FormPreviewProps {
  content: FormContent;
  config: PuckConfig;
  onClose: (state: boolean) => void;
}

export default function FormPreview({
  content,
  config,
  onClose,
}: FormPreviewProps) {
  return (
    <div className="relative">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <div className="text-sm text-muted-foreground">Preview</div>
        <button
          type="button"
          className="rounded bg-gray-900 px-3 py-1 text-xs text-white"
          onClick={() => onClose(false)}
        >
          Back to editor
        </button>
      </div>
      <div className="p-3">
        <Render config={config} data={content} />
      </div>
    </div>
  );
}
