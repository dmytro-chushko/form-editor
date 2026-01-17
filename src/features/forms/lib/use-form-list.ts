import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { useDebouncedValue } from '@/lib/hooks/use-debounce';
import { formatErrorMessage } from '@/lib/utils';

import { useGetFormList } from '../forms.api';

export function useFormList() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [title, setTitle] = useState('');
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();

  const debouncedTitle = useDebouncedValue(title, 500);
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
  }, [debouncedTitle, debouncedFromISO, debouncedToISO]);

  const {
    data: formList,
    isError: isErrorGetFormLIst,
    error: errorGetFormList,
    isLoading: isLoadingFormList,
  } = useGetFormList({
    page,
    pageSize,
    title: debouncedTitle || undefined,
    from: debouncedFromISO,
    to: debouncedToISO,
  });

  const totalPages = useMemo(
    () =>
      formList ? Math.max(1, Math.ceil(formList.total / formList.pageSize)) : 1,
    [formList]
  );

  useEffect(() => {
    if (isErrorGetFormLIst && errorGetFormList) {
      toast.error('Error loading form list', {
        description: formatErrorMessage(
          errorGetFormList,
          'Faild to load forms'
        ),
      });
    }
  }, [errorGetFormList, isErrorGetFormLIst]);

  return {
    formList: formList?.items,
    isLoading: isLoadingFormList,
    page,
    setPage,
    totalPages,
    totalCount: formList?.total,
    pageSize,
    title,
    setTitle,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
  };
}
