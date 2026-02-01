import { GearIcon } from '@phosphor-icons/react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

import { Button } from '../ui/button';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '../ui/dropdown-menu';

interface ActionsDropdownMenuProps {
  isPublish: boolean;
  onTogglePublish: () => void;
  onPreview: () => void;
  onSave: () => void;
  onDelete: () => void;
  onCopy: () => void;
}

export default function ActionsDropDownMenu({
  isPublish,
  onTogglePublish,
  onPreview,
  onSave,
  onDelete,
  onCopy,
}: ActionsDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon">
          <GearIcon size={32} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={onPreview}>Preview</DropdownMenuItem>
        <DropdownMenuItem onClick={onTogglePublish}>
          {isPublish ? 'Unpublish' : 'Publish'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSave}>Save</DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
        <DropdownMenuItem onClick={onCopy}>Copy</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
