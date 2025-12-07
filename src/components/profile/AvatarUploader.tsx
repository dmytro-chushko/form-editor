'use client';

import { UploadSimpleIcon } from '@phosphor-icons/react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

import {
  useAvatarUploadUrlMutation,
  useUpdateAvatarMutation,
} from '@/features/profile/profile.api';
import {
  avatarUpdateSchema,
  avatarUploadRequestSchema,
} from '@/features/profile/profile.schema';

import { Button } from '../ui/button';

export default function AvatarUploader() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);
  const { mutateAsync: getUrl } = useAvatarUploadUrlMutation();
  const { mutateAsync: saveAvatar } = useUpdateAvatarMutation();

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Only images are allowed');

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Max 5MB');

      return;
    }

    setBusy(true);
    try {
      const validatedFileData = avatarUploadRequestSchema.parse({
        filename: file.name,
        contentType: file.type,
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

      // prefer provided public url; otherwise save by objectPath (server will resolve)
      if (url) {
        const validatedImageUrl = avatarUpdateSchema.parse({ image: url });
        await saveAvatar(validatedImageUrl);
      } else {
        await saveAvatar({ image: '' /* fallback path */ } as any);
        await saveAvatar({ image: '', objectPath } as any);
      }
      toast.success('Avatar updated');
    } catch (err: any) {
      toast.error(err?.message || 'Failed to update avatar');
    } finally {
      setBusy(false);

      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div className="mt-4 text-center">
      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
      >
        Upload
        <UploadSimpleIcon size={32} />
      </Button>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        disabled={busy}
      />
    </div>
  );
}
