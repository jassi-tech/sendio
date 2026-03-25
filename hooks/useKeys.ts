import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { keysApi } from '@/lib/api';

export function useKeys() {
  return useQuery({
    queryKey: ['keys'],
    queryFn: () => keysApi.list(),
  });
}

export function useGenerateKey() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: object) => keysApi.generate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['keys'] });
    },
  });
}

export function useRevokeKey() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => keysApi.revoke(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['keys'] });
    },
  });
}
