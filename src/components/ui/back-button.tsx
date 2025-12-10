'use client';

import { ArrowLeftIcon } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';

import { Button } from './button';

interface BackButtonProps {
  backTo: string;
}

export default function BackButton({ backTo }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button size="icon" onClick={() => router.push(backTo)}>
      <ArrowLeftIcon size={32} />
    </Button>
  );
}
