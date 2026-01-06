import { useLoading } from "@/context/loading-context";
import { useToast } from "@/context/toast-context";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export const useSignup = () => {
    const { showToast } = useToast();
    const { setLoading } = useLoading();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

    const handleSignup = async () => {
        try {
            setLoading(true);

            const { error } = await authClient.signUp.email({
                email,
                name,
                password,
                username,
                displayUsername: name,
            });

            if (error) {
                showToast(error.message || 'There was error occured, please try again.', 'error');
                return;
            }

            showToast('You have signup successfully.')
        } catch (error: any) {
            showToast(error.message || 'You lost connection with network, please try again later', 'error');
            return;
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        name,
        setName,
        username,
        setUsername,
        handleSignup
    }
};