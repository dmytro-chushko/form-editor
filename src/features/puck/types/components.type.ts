import { ComponentData, SlotComponent } from '@measured/puck';

import { ValidationField } from './field-validation';

export type ContainerAlign = 'mr-auto' | 'mx-auto' | 'ml-auto';
export type ContainerWidth = 'w-full' | 'w-1/4' | 'w-1/2' | 'w-3/4';
export type TextAlign = 'text-left' | 'text-center' | 'text-right';
export type TextWeight = 'font-normal' | 'font-semibold' | 'font-bold';
export type HeadingTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
export type BlockPaddings = 'p-0' | 'p-2' | 'p-4' | 'p-6' | 'p-8';
export type PuckRefType = ((element: Element | null) => void) | null;

export type Components = {
  Input: {
    name: string;
    label: string;
    placeholder: string;
    inputType: string;
    validation: ValidationField;
  };
  Checkbox: {
    name: string;
    label: string;
    checked: boolean;
    validation: ValidationField;
  };
  Radio: {
    groupLabel: string;
    name: string;
    options: { value: string; label: string }[];
    selected: string;
    validation: ValidationField;
  };
  Textarea: {
    label: string;
    name: string;
    defaultValue: string;
    placeholder: string;
    rows: number;
    validation: ValidationField;
  };
  Select: {
    name: string;
    label: string;
    placeholder: string;
    options: { value: string; label: string }[];
    defaultValue: string;
    validation: ValidationField;
  };
  Flex: {
    direction: string;
    gap: number;
    justify: string;
    align: string;
    wrap: false;
    content?: SlotComponent | ComponentData[];
  };
  Container: {
    width: ContainerWidth;
    align: ContainerAlign;
    gap: string;
    padding: string;
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
    name: string;
    label: string;
    validation: ValidationField;
  };
};
