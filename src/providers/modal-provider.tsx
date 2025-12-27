'use client';

import { SendFormModal } from '@/features/modals/ui/send-form-modal';
import { ModalContextProvider } from '@/lib/modal-context';

export function ModalProvider({ children }: { children: React.ReactNode }) {
  return (
    <ModalContextProvider>
      {children}
      <SendFormModal />
    </ModalContextProvider>
  );
}
