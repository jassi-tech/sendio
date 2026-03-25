import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { templatesApi } from '@/lib/api';
import type { Template, FullTemplate } from '@/lib/interface';

export function useTemplates() {
  return useQuery({
    queryKey: ['templates'],
    queryFn: () => templatesApi.list() as Promise<Template[]>,
  });
}

// export function useTemplate(id: string) {
//   return useQuery({
//     queryKey: ['templates', id],
//     queryFn: () => templatesApi.get(id) as Promise<FullTemplate>,
//     enabled: !!id,
//   });
// }

export function useCreateTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: object) => templatesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });
}

export function useUpdateTemplate(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: object) => templatesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      queryClient.invalidateQueries({ queryKey: ['templates', id] });
    },
  });
}

export function useDeleteTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => templatesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });
}
