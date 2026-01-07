import { useLoading } from "@/context/loading-context";
import { useToast } from "@/context/toast-context";
import { authClient } from "@/lib/auth-client";

export const useLogout = () => {
    const { setLoading } = useLoading();
    const { showToast } = useToast();

    const handleLogout = async () => {
        try {
            setLoading(true);
            await authClient.signOut();
        } catch (error: any) {
            showToast(error.message || 'You lost connection with network, please try again later', 'error');
        } finally {
            setLoading(false);
        }
    };

    return {
        handleLogout
    }
};