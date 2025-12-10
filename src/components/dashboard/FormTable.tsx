'use client';

import {
  CheckCircleIcon,
  MinusCircleIcon,
  PencilSimpleIcon,
  XCircleIcon,
} from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';

import { FormListResponse } from '@/features/forms/forms.schema';

import { Button } from '../ui/button';
import { ButtonGroup } from '../ui/button-group';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export function FormTable({ forms }: { forms: FormListResponse[] }) {
  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Published</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {forms.map(({ id, title, createdAt, isPublished }) => (
          <TableRow key={id}>
            <TableCell>{title}</TableCell>
            <TableCell>{createdAt}</TableCell>
            <TableCell>
              {isPublished ? (
                <CheckCircleIcon size={32} className="text-green-700" />
              ) : (
                <MinusCircleIcon size={32} className="text-red-600" />
              )}
            </TableCell>
            <TableCell>
              <ButtonGroup>
                <Button
                  size="icon"
                  onClick={() => router.push(`/dashboard/forms/${id}/edit`)}
                >
                  <PencilSimpleIcon size={32} />
                </Button>
                <Button size="icon">
                  <XCircleIcon size={32} />
                </Button>
              </ButtonGroup>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
