'use client';

import { WarningCircleIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ROUTES } from '@/lib/constants/routes';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-md text-center border-destructive/20">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <WarningCircleIcon size={40} className="text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Something went wrong!
          </CardTitle>
          <CardDescription>
            An unexpected error occurred while processing your request.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-muted p-4 text-left">
            <p className="text-xs font-mono text-muted-foreground break-all">
              {error.message || 'Unknown error'}
            </p>
            {error.digest && (
              <p className="mt-2 text-[10px] text-muted-foreground">
                Digest: {error.digest}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 sm:flex-row justify-center">
          <Button
            variant="outline"
            onClick={() => reset()}
            className="w-full sm:w-auto"
          >
            Try again
          </Button>
          <Button asChild className="w-full sm:w-auto">
            <Link href={ROUTES.Dashboard}>Go to Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
