import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/lib/api';

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => authApi.me(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useRequestMagicLink() {
  return useMutation({
    mutationFn: (email: string) => authApi.requestMagicLink(email),
  });
}

export function useVerify() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (token: string) => authApi.verify(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
}


export function useDeleteAccount() {
  return useMutation({
    mutationFn: () => authApi.deleteAccount(),
  });
}
