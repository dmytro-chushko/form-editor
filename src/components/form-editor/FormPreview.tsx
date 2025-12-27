import { Render } from '@measured/puck';

import { FormContent } from '@/features/forms/model/forms.schema';
import { PuckConfig } from '@/features/puck/puck.config';

import { Button } from '../ui/button';

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
        <Button type="button" onClick={() => onClose(false)}>
          Back to editor
        </Button>
      </div>
      <div className="p-3">
        <form>
          <Render config={config} data={content} />
        </form>
      </div>
    </div>
  );
}
