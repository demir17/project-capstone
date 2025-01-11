"use client";

import Header from "@/components/header/Header";
import Aside from "@/components/side-menu/Aside";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60,
    },
  },
});

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <Aside />
        <main
          className={`container mx-auto flex grow flex-col px-8 py-8 xl:max-h-screen`}
        >
          <Header />
          {children}
        </main>
      </Suspense>
    </QueryClientProvider>
  );
}
