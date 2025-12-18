import { ChangeEvent, useCallback, useRef, useState } from 'react';

export function useAddFile() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [addedFileName, setAddedFileName] = useState<string>('file-name');

  const handleOpenPicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleAddFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setAddedFileName(e.target.files?.[0].name || '');
  }, []);

  return {
    inputRef,
    handleOpenPicker,
    addedFileName,
    handleAddFile,
  };
}
