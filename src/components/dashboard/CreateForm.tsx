'use client';

import { FilePlusIcon } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { useCreateForm } from '@/features/forms/forms.api';

import { Button } from '../ui/button';

export function CreateForm() {
  const { mutateAsync, isPending } = useCreateForm();
  const router = useRouter();

  const handleClick = useCallback(async () => {
    try {
      const response = await mutateAsync({ title: 'Untitled' });
      router.push(`dashboard/forms/${response.id}/edit`);
    } catch (err: any) {
      toast.error(err?.message || 'Could not create form');
    }
  }, [mutateAsync, router]);

  return (
    <Button disabled={isPending} onClick={handleClick}>
      Create form <FilePlusIcon size={32} />
    </Button>
  );
}
