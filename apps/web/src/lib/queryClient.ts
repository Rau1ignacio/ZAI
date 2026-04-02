import { QueryClient } from "@tanstack/react-query";

// Cliente unico para cachear y sincronizar peticiones del MVP.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});
