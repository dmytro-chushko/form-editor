'use client';

import { useQuery } from '@tanstack/react-query';

import { apiGet } from '@/lib/api/apiClient';
import { queryKeys as qk } from '@/lib/api/queryKeys';

import {
  FormResultsParams,
  ResultsOverviewParams,
  ResultsOverviewResponse,
  ResultsSubFormResponse,
} from './model/results.schema';

export function useGetResultsOverview(params: ResultsOverviewParams) {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 20;

  const qs = new URLSearchParams();
  qs.set('page', String(page));
  qs.set('pageSize', String(pageSize));

  if (params.title) qs.set('title', params.title);

  if (params.from) qs.set('from', params.from);

  if (params.to) qs.set('to', params.to);

  return useQuery({
    queryKey: qk.overview(page, pageSize, params.title, params.from, params.to),
    queryFn: () =>
      apiGet<ResultsOverviewResponse>(`/api/results?${qs.toString()}`),
    placeholderData: (previousData) => previousData,
    staleTime: 0,
  });
}

export function useGetFormResults(formId: string, params: FormResultsParams) {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 20;

  const qs = new URLSearchParams();
  qs.set('page', String(page));
  qs.set('pageSize', String(pageSize));

  if (params.email) qs.set('email', params.email);

  if (params.from) qs.set('from', params.from);

  if (params.to) qs.set('to', params.to);

  return useQuery({
    queryKey: qk.formResults(formId, {
      page,
      pageSize,
      email: params.email ?? '',
      from: params.from ?? '',
      to: params.to ?? '',
    }),
    queryFn: () =>
      apiGet<ResultsSubFormResponse>(`/api/results/${formId}?${qs.toString()}`),
    placeholderData: (previousData) => previousData,
  });
}
