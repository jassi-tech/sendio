import { useQuery } from '@tanstack/react-query';
import { logsApi } from '@/lib/api';
import type { LogItem } from '@/lib/interface';

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export function useLogs(params?: { page?: number; limit?: number; status?: string }) {
  return useQuery<PaginatedResponse<LogItem>>({
    queryKey: ['logs', params],
    queryFn: () => logsApi.list(params) as Promise<PaginatedResponse<LogItem>>,
  });
}

export function useLog(id: string) {
  return useQuery<LogItem>({
    queryKey: ['logs', id],
    queryFn: () => logsApi.get(id) as Promise<LogItem>,
    enabled: !!id,
  });
}
