'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import * as React from 'react';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = React.useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        {children}
        <Toaster
          richColors
          closeButton
          expand
          position="top-right"
          theme="system"
        />
      </QueryClientProvider>
    </SessionProvider>
  );
}
