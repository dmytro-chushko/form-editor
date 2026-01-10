import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import { useGetFormResults } from '../results.api';

export function useResults() {
  const { formId } = useParams<{ formId: string }>();

  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [email, setEmail] = useState('');
  const [from, setFrom] = useState<string>(''); // ISO
  const [to, setTo] = useState<string>(''); // ISO

  const { data, isLoading } = useGetFormResults(formId, {
    page,
    pageSize,
    email: email || undefined,
    from: from || undefined,
    to: to || undefined,
  });

  const totalPages = useMemo(
    () => (data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1),
    [data]
  );

  return {
    formResults: data,
    isLoading,
    page,
    setPage,
    totalPages,
    email,
    setEmail,
    from,
    setFrom,
    to,
    setTo,
  };
}
