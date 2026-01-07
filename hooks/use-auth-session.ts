import { useToast } from '@/context/toast-context';
import { authClient } from '@/lib/auth-client';
import { useEffect } from 'react';

export const useAuthSession = (requireAuth: boolean = true) => {
    const { data: session, isPending, error } = authClient.useSession();
    const { showToast } = useToast();

    useEffect(() => {
        if (!isPending && !session && requireAuth) {
            showToast('You need to be logged in', 'error');
        }
    }, [isPending, session, requireAuth, showToast]);

    return {
        session,
        isPending,
        error,
        isAuthenticated: !!session && !isPending,
    };
};