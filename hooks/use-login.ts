import { useLoading } from "@/context/loading-context";
import { useToast } from "@/context/toast-context";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export const useLogin = () => {
    const { setLoading } = useLoading();
    const { showToast } = useToast();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState('');

    const handleLogin = async () => {
        setIsError(false);
        setErrorText('');

        if (!username || !password) {
            showToast('All inputs are required to login', 'error');
            setIsError(true);
            setErrorText('All inputs are required to login');
            return;
        }

        try {
            setLoading(true);

            const { error } = await authClient.signIn.username({
                username,
                password,
            });

            if (error) {
                showToast(error.message || 'There was error occured, please try again.', 'error');
                setIsError(true);
                setErrorText(error.message || 'There was error occured, please try again.');
                return;
            }

            showToast('You have logged in successfully.');
        } catch (error: any) {
            showToast(error.message || 'You lost connection with network, please try again later', 'error');
            setIsError(true);
            setErrorText(error.message || 'There was error occured, please try again.');
        } finally {
            setLoading(false);
        }
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        isError,
        errorText,
        handleLogin
    }
};