'use client';

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useParams, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import z from 'zod';

import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
  apiPut,
} from '@/lib/api/apiClient';
import { queryKeys as qk } from '@/lib/api/queryKeys';

import { FormTokenSchema } from './model/form-token.schema';
import {
  FormItemSchema,
  FormListParams,
  FormListResponse,
  ProgressFormResponse,
  SubmittedFormPayload,
  UpdateFormSchema,
} from './model/forms.schema';

export function useCreateForm() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data?: { title?: string; description?: string }) =>
      apiPost<{ id: string }>('/api/forms', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.forms() });
    },
  });
}

export function useGetFormList(params: FormListParams) {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 20;

  const qs = new URLSearchParams();
  qs.set('page', String(page));
  qs.set('pageSize', String(pageSize));

  if (params.title) qs.set('title', params.title);

  if (params.from) qs.set('from', params.from);

  if (params.to) qs.set('to', params.to);

  return useQuery({
    queryKey: qk.forms(
      page,
      pageSize,
      params.title ?? '',
      params.from ?? '',
      params.to ?? ''
    ),
    queryFn: () => apiGet<FormListResponse>(`/api/forms?${qs.toString()}`),
  });
}

export function useGetFormById() {
  const { id } = useParams<{ id: string }>();

  return useQuery({
    queryKey: qk.form(id),
    queryFn: () => apiGet<FormItemSchema>(`/api/forms/${id}`),
    placeholderData: keepPreviousData,
  });
}

export function useUpdateForm() {
  const { id } = useParams<{ id: string }>();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateFormSchema) =>
      apiPatch<FormItemSchema>(`/api/forms/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.forms() });
      qc.invalidateQueries({ queryKey: qk.form(id) });
      toast.success('Form saved');
    },
  });
}

export function useDeleteForm() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (formId: string) => apiDelete(`/api/forms/${formId}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.forms() });
      toast.success('Form deleted');
    },
  });
}

export function useTogglePublish() {
  const { id } = useParams<{ id: string }>();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      isPublished,
      formId,
    }: {
      isPublished: boolean;
      formId: string;
    }) => apiPatch<FormItemSchema>(`/api/forms/${formId}`, { isPublished }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.forms() });
      qc.invalidateQueries({ queryKey: qk.form(id) });
    },
  });
}

export function useCopyForm() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (formId: string) =>
      apiPost<FormItemSchema>(`/api/forms/${formId}/copy`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.forms() });
      toast.success('Form copied');
    },
  });
}
export function useGetSharingLink() {
  return useMutation({
    mutationFn: (data: FormTokenSchema) =>
      apiPost<{ shareFormLink: string; message?: string }>(
        `/api/forms/sharing`,
        data
      ),
    onSuccess: (data) => {
      if (data.message) {
        toast.success(data.message);
      }
    },
  });
}

export function useGetFormByToken() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  return useQuery({
    queryKey: qk.sharedForm(token),
    queryFn: () => apiGet<FormItemSchema>(`/api/forms/sharing?token=${token}`),
  });
}

export function useFileUploadUrlMutation() {
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  return useMutation({
    mutationFn: (data: {
      fileName: string;
      contentType: string;
      directory: string;
    }) =>
      apiPost<{ uploadUrl: string; objectPath: string; url?: string }>(
        `/api/forms/sharing/upload-url?token=${token}`,
        data
      ),
  });
}

export function useSubmitSharedForm() {
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  return useMutation({
    mutationFn: (data: SubmittedFormPayload) =>
      apiPost<{ ok: boolean }>(
        `/api/forms/sharing/submit-data?token=${token}`,
        data
      ),
  });
}

const isValidEmail = (email?: string) => {
  try {
    Boolean(z.email().parse(email));
  } catch {
    return false;
  }
};

export function useGetFormProgressByToken(email?: string) {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  return useQuery({
    queryKey: qk.formProgress(token),
    queryFn: () =>
      apiGet<ProgressFormResponse>(
        `/api/forms/sharing/progress/${email}?token=${token}`
      ),
    enabled: Boolean(token && isValidEmail(email)),
  });
}

export function useSaveFormProgress() {
  const qc = useQueryClient();
  const searchParams = useSearchParams();

  const token = searchParams.get('token') || '';

  return useMutation({
    mutationFn: (data: SubmittedFormPayload) =>
      apiPut<ProgressFormResponse>(
        `/api/forms/sharing/progress/${data.userEmail}?token=${token}`,
        data
      ),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.formProgress(token) });
      toast.success('Form progress saved');
    },
  });
}
