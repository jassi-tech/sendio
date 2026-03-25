import { useQuery } from '@tanstack/react-query';
import { servicesApi, ServiceDef } from '@/lib/api';

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: () => servicesApi.list() as Promise<ServiceDef[]>,
  });
}
