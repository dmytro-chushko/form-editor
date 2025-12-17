'use client';

import { FileArrowUpIcon } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import { useAddFile } from '@/features/forms/use-upload-file';

interface PuckFileBlockProps {
  label: string;
  puckRef: ((element: Element | null) => void) | null;
}

export default function PuckFileBlock({ label, puckRef }: PuckFileBlockProps) {
  const { inputRef, handleOpenPicker, addedFileName, handleAddFile } =
    useAddFile();

  return (
    <div ref={puckRef}>
      <label>{label}</label>
      <div className="flex items-center gap-2 bg-foreground w-32 rounded-md text-background p-2">
        <input ref={inputRef} type="file" hidden onChange={handleAddFile} />
        <div>{addedFileName}</div>
        <Button size="icon" onClick={handleOpenPicker}>
          <FileArrowUpIcon size={32} />
        </Button>
      </div>
    </div>
  );
}
