'use client';

import {
  CheckCircleIcon,
  CopyIcon,
  MinusCircleIcon,
  PencilSimpleIcon,
  XCircleIcon,
} from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';

import { FormListResponse } from '@/features/forms/forms.schema';
import { useFormCommon } from '@/features/forms/lib/use-form-common';

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

export function FormTable({ forms }: { forms: FormListResponse }) {
  const router = useRouter();
  const { onDelete, onTogglePublish, onCopy } = useFormCommon();

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
            <TableCell>{String(createdAt)}</TableCell>
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
                <Button
                  size="icon"
                  onClick={() => onTogglePublish(id, !isPublished)}
                >
                  {!isPublished ? (
                    <CheckCircleIcon size={32} className="text-green-700" />
                  ) : (
                    <MinusCircleIcon size={32} className="text-red-600" />
                  )}
                </Button>
                <Button size="icon" onClick={() => onCopy(id)}>
                  <CopyIcon size={32} />
                </Button>
                <Button size="icon" onClick={() => onDelete(id)}>
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
