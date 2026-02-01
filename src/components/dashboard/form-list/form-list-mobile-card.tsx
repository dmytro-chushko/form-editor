import {
  CheckCircleIcon,
  CopyIcon,
  MinusCircleIcon,
  PencilSimpleIcon,
  ShareFatIcon,
  XCircleIcon,
} from '@phosphor-icons/react';
import { format } from 'date-fns';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Field } from '@/components/ui/field';
import { useFormCommon } from '@/features/forms/lib/use-form-common';
import { FormItemSchema } from '@/features/forms/model/forms.schema';
import { useModal } from '@/features/modals/lib/use-modal';
import { ROUTES } from '@/lib/constants/routes';

type FormListMobileCardProps = Pick<
  FormItemSchema,
  'id' | 'title' | 'createdAt' | 'isPublished'
>;

export function FormListMobileCard({
  id,
  title,
  createdAt,
  isPublished,
}: FormListMobileCardProps) {
  const { onDelete, onTogglePublish, onCopy } = useFormCommon();
  const { open } = useModal();

  return (
    <div key={id} className="rounded-md border p-3">
      <Field orientation="vertical" className="justify-between">
        <Field orientation="horizontal">
          <div className="text-sm font-bold">Title:</div>
          <div className="text-sm">{title}</div>
        </Field>
        <Field orientation="horizontal">
          <div className="text-sm font-bold">Created:</div>
          <div className="text-sm text-muted-foreground">
            {format(createdAt, 'do MMMM yyyy')}
          </div>
        </Field>
        <Field orientation="horizontal">
          <div className="text-sm font-bold">Published:</div>
          <div className="mt-1 text-xs break-words">
            {isPublished ? (
              <CheckCircleIcon size={32} className="text-green-700" />
            ) : (
              <MinusCircleIcon size={32} className="text-red-600" />
            )}
          </div>
        </Field>
        <ButtonGroup>
          <Button asChild size="icon" className="size-12">
            <Link href={`${ROUTES.Forms}/${id}/edit`}>
              <PencilSimpleIcon size={32} />
            </Link>
          </Button>
          <Button
            size="icon"
            className="size-12"
            onClick={() => onTogglePublish(id, !isPublished)}
          >
            {!isPublished ? (
              <CheckCircleIcon size={32} className="text-green-700" />
            ) : (
              <MinusCircleIcon size={32} className="text-red-600" />
            )}
          </Button>
          <Button size="icon" className="size-12" onClick={() => onCopy(id)}>
            <CopyIcon size={32} />
          </Button>
          <Button
            size="icon"
            className="size-12"
            disabled={!isPublished}
            onClick={() => open('send-form', { formId: id })}
          >
            <ShareFatIcon size={32} />
          </Button>
          <Button size="icon" className="size-12" onClick={() => onDelete(id)}>
            <XCircleIcon size={32} />
          </Button>
        </ButtonGroup>
      </Field>
    </div>
  );
}
