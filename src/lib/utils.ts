import { clsx, type ClassValue } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatErrorMessage(error: unknown, fallbackMessage: string) {
  return error instanceof Error ? error.message : fallbackMessage;
}

export function splitTimestamp(timeValue: number) {
  const fullDate = new Date(timeValue);

  const dateOnly = new Date(timeValue);
  dateOnly.setHours(0, 0, 0, 0);

  const hours = String(fullDate.getHours()).padStart(2, '0');
  const minutes = String(fullDate.getMinutes()).padStart(2, '0');
  const seconds = String(fullDate.getSeconds()).padStart(2, '0');

  const timeString = `${hours}:${minutes}:${seconds}`;

  return {
    date: dateOnly,
    time: timeString,
  };
}

export function durationToMs(timeStr: string): number {
  const timeArray = timeStr
    .split(':')
    .map(Number)
    .filter((item) => item);

  if (!timeArray.length) return 0;

  const [hours, minutes, seconds] = timeArray;

  return ((hours * 3600 || 0) + (minutes * 60 || 0) + (seconds || 0)) * 1000;
}

export async function copyToClipboard(body: string) {
  try {
    await navigator.clipboard.writeText(body);
    toast.success('Link copied to clipboard!');
  } catch {
    toast.error('Could not copy');
  }
}

const isFile = (v: unknown): v is File =>
  typeof File !== 'undefined' && v instanceof File;

const isFileList = (v: unknown): v is FileList =>
  typeof FileList !== 'undefined' && v instanceof FileList;

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  !!v &&
  typeof v === 'object' &&
  !Array.isArray(v) &&
  !isFile(v) &&
  !isFileList(v) &&
  !(v instanceof Date);

const containsFileDeep = (v: unknown): boolean => {
  if (isFile(v) || isFileList(v)) return true;

  if (Array.isArray(v)) return v.some(containsFileDeep);

  if (isPlainObject(v)) return Object.values(v).some(containsFileDeep);

  return false;
};

export function stripFileFields<T extends Record<string, unknown>>(
  values: T
): Partial<T> {
  return Object.entries(values).reduce<Partial<T>>((acc, [key, val]) => {
    if (!containsFileDeep(val)) acc[key as keyof T] = val as T[keyof T];

    return acc;
  }, {});
}

export function getPaginationAndFilterParams(
  url: URL,
  filterParamsArray: string[]
) {
  const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
  const pageSize = Math.min(
    100,
    Math.max(1, Number(url.searchParams.get('pageSize') ?? '20'))
  );

  const filters = filterParamsArray.reduce(
    (acc, key) => {
      const value = url.searchParams.get(key);

      if (value) {
        acc[key] = value;
      }

      return acc;
    },
    {} as Record<string, string>
  );

  return { page, pageSize, filters };
}
