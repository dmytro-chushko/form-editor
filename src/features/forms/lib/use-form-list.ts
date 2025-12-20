import { useEffect } from 'react';
import { toast } from 'sonner';

import { formatErrorMessage } from '@/lib/utils';

import { useGetFormList } from '../forms.api';
import { FormListResponse } from '../forms.schema';

interface UseFormList {
  formList?: FormListResponse;
  isLoading: boolean;
}

export function useFormList(): UseFormList {
  const {
    data: formList,
    isError: isErrorGetFormLIst,
    error: errorGetFormList,
    isLoading: isLoadingFormList,
  } = useGetFormList();

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
    formList,
    isLoading: isLoadingFormList,
  };
}
