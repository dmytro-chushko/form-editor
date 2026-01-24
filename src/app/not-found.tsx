import { FileSearchIcon } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

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

export default function NotFound() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <FileSearchIcon size={40} className="text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Page Not Found</CardTitle>
          <CardDescription>
            The page you are looking for doesn&apos;t exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Please check the URL or return to the dashboard to continue working
            on your forms.
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button asChild>
            <Link href={ROUTES.Dashboard}>Go to Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
