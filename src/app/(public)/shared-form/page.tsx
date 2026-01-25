import { Suspense } from 'react';

import { SharedFormLayout } from '@/components/shared-form/shared-form-layout';
import { SharedFormSkeleton } from '@/components/ui/app-skeletons';

export default function SharedFormPage() {
  return (
    <Suspense fallback={<SharedFormSkeleton />}>
      <SharedFormLayout />
    </Suspense>
  );
}
