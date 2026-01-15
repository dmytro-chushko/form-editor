import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { useDebouncedValue } from '@/lib/hooks/use-debounce';

import { useGetFormResults } from '../results.api';

export function useResults() {
  const { formId } = useParams<{ formId: string }>();

  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [email, setEmail] = useState('');
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();

  const debouncedEmail = useDebouncedValue(email, 500);
  const debouncedFromISO = useDebouncedValue(
    fromDate ? fromDate.toISOString() : undefined,
    500
  );
  const debouncedToISO = useDebouncedValue(
    toDate ? toDate.toISOString() : undefined,
    500
  );

  useEffect(() => {
    setPage(1);
  }, [debouncedEmail, debouncedFromISO, debouncedToISO]);

  const { data, isLoading } = useGetFormResults(formId, {
    page,
    pageSize,
    email: debouncedEmail || undefined,
    from: debouncedFromISO,
    to: debouncedToISO,
  });

  const totalPages = useMemo(
    () => (data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1),
    [data]
  );

  const contentDataArray = data?.items.map((item) => item.content) || [];
  const formResults = data?.items.map((item) => {
    const { content, ...restItem } = item;

    return { ...restItem, ...content };
  });

  return {
    formResults,
    contentDataArray,
    isLoading,
    page,
    setPage,
    totalPages,
    pageSize,
    totalCount: data?.total,
    email,
    setEmail,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
  };
}
