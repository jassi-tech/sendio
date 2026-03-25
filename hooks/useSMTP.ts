import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { smtpApi } from '@/lib/api';

export function useSMTPList() {
  return useQuery({
    queryKey: ['smtp'],
    queryFn: () => smtpApi.list(),
  });
}

export function useSaveSMTP() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: object) => smtpApi.save(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['smtp'] });
    },
  });
}

export function useUpdateSMTP() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: object }) => smtpApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['smtp'] });
    },
  });
}

export function useDeleteSMTP() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => smtpApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['smtp'] });
    },
  });
}

export function useTestSMTP() {
  return useMutation({
    mutationFn: (data: object) => smtpApi.test(data),
  });
}
