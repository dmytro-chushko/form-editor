import { PencilSimpleIcon, ShareFatIcon } from '@phosphor-icons/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import {
  ArrowUpDownIcon,
  CheckCircleIcon,
  CopyIcon,
  MinusCircleIcon,
  XCircleIcon,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { TooltipWrapper } from '@/components/ui/tooltip';
import { useFormCommon } from '@/features/forms/lib/use-form-common';
import { FormItemSchema } from '@/features/forms/model/forms.schema';
import { useModal } from '@/features/modals/lib/use-modal';
import { ROUTES } from '@/lib/constants/routes';

export function useFormListColumns() {
  const { onDelete, onTogglePublish, onCopy } = useFormCommon();
  const { open } = useModal();

  const columns: ColumnDef<FormItemSchema>[] = [
    {
      accessorKey: 'title',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Title
            <ArrowUpDownIcon className="ml-2 size-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Created
            <ArrowUpDownIcon className="ml-2 size-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <span className="text-sm">
            {format(row.original.createdAt, 'do MMMM yyyy')}
          </span>
        );
      },
    },
    {
      accessorKey: 'isPublished',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Published
            <ArrowUpDownIcon className="ml-2 size-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            {row.original.isPublished ? (
              <CheckCircleIcon size={32} className="text-green-700" />
            ) : (
              <MinusCircleIcon size={32} className="text-red-600" />
            )}
          </div>
        );
      },
    },

    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <ButtonGroup>
            <TooltipWrapper capture="Edit">
              <Button asChild size="icon">
                <Link href={`${ROUTES.Forms}/${row.original.id}/edit`}>
                  <PencilSimpleIcon size={32} />
                </Link>
              </Button>
            </TooltipWrapper>
            <TooltipWrapper
              capture={row.original.isPublished ? 'Unpublish' : 'Publish'}
            >
              <Button
                size="icon"
                onClick={() =>
                  onTogglePublish(row.original.id, !row.original.isPublished)
                }
              >
                {!row.original.isPublished ? (
                  <CheckCircleIcon size={32} className="text-green-700" />
                ) : (
                  <MinusCircleIcon size={32} className="text-red-600" />
                )}
              </Button>
            </TooltipWrapper>
            <TooltipWrapper capture="Copy">
              <Button size="icon" onClick={() => onCopy(row.original.id)}>
                <CopyIcon size={32} />
              </Button>
            </TooltipWrapper>
            <TooltipWrapper capture="Send Form">
              <Button
                size="icon"
                disabled={!row.original.isPublished}
                onClick={() => open('send-form', { formId: row.original.id })}
              >
                <ShareFatIcon size={32} />
              </Button>
            </TooltipWrapper>
            <TooltipWrapper capture="Delete">
              <Button size="icon" onClick={() => onDelete(row.original.id)}>
                <XCircleIcon size={32} />
              </Button>
            </TooltipWrapper>
          </ButtonGroup>
        );
      },
    },
  ];

  return {
    columns,
  };
}
