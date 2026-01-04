import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';

import { useFileUploadUrlMutation } from '../forms.api';
import { fileUploadRequestSchema } from '../model/form-file-uppload.schema';

export function useAddFile() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [addedFileName, setAddedFileName] = useState<string>('file-name');
  const [isFileUploading, setIsFileUploading] = useState(false);
  const { mutateAsync: getUrl, isPending } = useFileUploadUrlMutation();

  const handleOpenPicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleAddFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setAddedFileName(e.target.files?.[0].name || '');
  }, []);

  const uploadFile = useCallback(
    async (file: File) => {
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        toast.error('Max file size 5MB');

        return;
      }

      setIsFileUploading(true);

      try {
        const validatedFileData = fileUploadRequestSchema.parse({
          fileName: file.name,
          contentType: file.type,
          directory: 'form-files',
        });
        const { uploadUrl, objectPath, url } = await getUrl(validatedFileData);

        const putRes = await fetch(uploadUrl, {
          method: 'PUT',
          headers: {
            'content-type': file.type,
            'x-upsert': 'true',
          },
          body: file,
        });

        if (!putRes.ok) {
          throw new Error('Upload failed');
        }

        return url || objectPath;
      } catch (err: any) {
        toast.error(err?.message || 'Failed to upload file');
      } finally {
        setIsFileUploading(false);
      }
    },
    [getUrl]
  );

  return {
    inputRef,
    handleOpenPicker,
    addedFileName,
    handleAddFile,
    uploadFile,
    isFileUploading: isPending || isFileUploading,
  };
}
