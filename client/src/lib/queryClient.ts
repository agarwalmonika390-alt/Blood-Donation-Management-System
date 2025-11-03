import { QueryClient } from "@tanstack/react-query";
import { SupabaseStorage } from './storage';

export const storage = new SupabaseStorage();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
