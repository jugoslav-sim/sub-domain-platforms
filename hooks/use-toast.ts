import { useState, useCallback } from 'react';

interface ToastOptions {
    title: string;
    description?: string;
    variant?: 'default' | 'destructive';
    duration?: number;
}

interface Toast extends ToastOptions {
    id: string;
}

// Simple toast hook - in production, use a proper toast library like sonner or react-hot-toast
export function useToast() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = useCallback((options: ToastOptions) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast: Toast = { ...options, id };

        setToasts(prev => [...prev, newToast]);

        // Auto-dismiss after duration (default 5s)
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, options.duration || 5000);

        // Also log to console for visibility
        console.log(`[Toast] ${options.title}: ${options.description || ''}`);

        return id;
    }, []);

    const dismiss = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return { toast, toasts, dismiss };
}
