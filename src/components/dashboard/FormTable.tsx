'use client';

import {
  CheckCircleIcon,
  CopyIcon,
  MinusCircleIcon,
  PencilSimpleIcon,
  ShareFatIcon,
  XCircleIcon,
} from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';

import { useFormCommon } from '@/features/forms/lib/use-form-common';
import { FormListResponse } from '@/features/forms/model/forms.schema';
import { useModal } from '@/features/modals/lib/use-modal';

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
import { TooltipWrapper } from '../ui/tooltip';

export function FormTable({ forms }: { forms: FormListResponse['items'] }) {
  const router = useRouter();
  const { onDelete, onTogglePublish, onCopy } = useFormCommon();
  const { open } = useModal();

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
                <TooltipWrapper capture="Edit">
                  <Button
                    size="icon"
                    onClick={() => router.push(`/dashboard/forms/${id}/edit`)}
                  >
                    <PencilSimpleIcon size={32} />
                  </Button>
                </TooltipWrapper>
                <TooltipWrapper capture={isPublished ? 'Unpublish' : 'Publish'}>
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
                </TooltipWrapper>
                <TooltipWrapper capture="Copy">
                  <Button size="icon" onClick={() => onCopy(id)}>
                    <CopyIcon size={32} />
                  </Button>
                </TooltipWrapper>
                <TooltipWrapper capture="Send Form">
                  <Button
                    size="icon"
                    disabled={!isPublished}
                    onClick={() => open('send-form', { formId: id })}
                  >
                    <ShareFatIcon size={32} />
                  </Button>
                </TooltipWrapper>
                <TooltipWrapper capture="Delete">
                  <Button size="icon" onClick={() => onDelete(id)}>
                    <XCircleIcon size={32} />
                  </Button>
                </TooltipWrapper>
              </ButtonGroup>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
