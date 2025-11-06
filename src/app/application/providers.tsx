"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast"; 
import { useState } from "react"; 

export function ApplicationProviders({ children }: IChildrenProps) {
    // ✅ تعریف QueryClient داخل useState برای تضمین یکتا بودن نمونه در SSR/CSR
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000, // cacheTime را نیز اضافه کنید
                gcTime: 10 * 60 * 1000, // مثلاً بعد از ۱۰ دقیقه از کش حذف شود
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster position="top-left" containerStyle={{top: 50}}/>
        </QueryClientProvider>
    );
}