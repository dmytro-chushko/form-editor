import { ComponentData, SlotComponent } from '@measured/puck';

export type ContainerAlign = 'mr-auto' | 'mx-auto' | 'ml-auto';
export type ContainerWidth = 'w-full' | 'w-1/4' | 'w-1/2' | 'w-3/4';
export type TextAlign = 'text-left' | 'text-center' | 'text-right';
export type TextWeight = 'font-normal' | 'font-semibold' | 'font-bold';
export type HeadingTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
export type BlockPaddings = 'p-0' | 'p-2' | 'p-4' | 'p-6' | 'p-8';
export type PuckRefType = ((element: Element | null) => void) | null;

export type Components = {
  Input: {
    label: string;
    placeholder: string;
    inputType: string;
  };
  Checkbox: {
    label: string;
    checked: boolean;
  };
  Radio: {
    groupLabel: string;
    name: string;
    options: { value: string; label: string }[];
    selected: string;
  };
  Textarea: {
    label: string;
    placeholder: string;
    rows: number;
  };
  Select: {
    label: string;
    options: { value: string; label: string }[];
  };
  Flex: {
    direction: string;
    gap: number;
    justify: string;
    align: string;
    wrap: false;
    // In render this becomes SlotComponent, but in defaultProps it's ComponentData[]
    content?: SlotComponent | ComponentData[];
  };
  Container: {
    width: ContainerWidth;
    align: ContainerAlign;
    gap: string;
    padding: string;
    // In render this becomes SlotComponent, but in defaultProps it's ComponentData[]
    content?: SlotComponent | ComponentData[];
  };
  Heading: {
    tag: HeadingTags;
    headingText: string;
    align: TextAlign;
    weight: TextWeight;
  };
  Paragraph: {
    paragraphText: string;
    align: TextAlign;
    weight: TextWeight;
    padding: BlockPaddings;
  };

  Button: {
    variant: string;
    size: string;
    fullWidth: boolean;
    buttonType: string;
    buttonText: string;
  };

  File: {
    label: string;
  };
};
