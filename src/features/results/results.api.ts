'use client';

import { useQuery } from '@tanstack/react-query';

import { apiGet } from '@/lib/api/apiClient';
import { queryKeys as qk } from '@/lib/api/queryKeys';

import { ResultsOverviewResponse } from './model/results.schema';

export function useGetResultsOverview(page = 1, pageSize = 20) {
  return useQuery({
    queryKey: qk.overview(page, pageSize),
    queryFn: () =>
      apiGet<ResultsOverviewResponse>(
        `/api/results?page=${page}&pageSize=${pageSize}`
      ),
    placeholderData: (previousData) => previousData,
    staleTime: 0,
  });
}
