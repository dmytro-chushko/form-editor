import { ValidationRule } from 'react-hook-form';

export type ValidationFieldMessages = {
  required: {
    value: boolean;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  min?: {
    value: number;
    message: string;
  };
  max?: {
    value: number;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
  email?: {
    value: boolean;
    message: string;
  };
};

export type ValidationField = {
  required: boolean;
  maxLength?: number;
  minLength?: number;
  min?: number;
  max?: number;
  email?: boolean;
};

export type ValidationWithEmailPattern = Omit<
  ValidationFieldMessages,
  'email'
> & {
  pattern?: { value: ValidationRule<RegExp>; message: string };
};
