import { useLoading } from "@/context/loading-context";
import { useToast } from "@/context/toast-context";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export const useResetPassword = () => {
    const { setLoading } = useLoading();
    const { showToast } = useToast();

    const [newPassword, setNewPassword] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState('');

    const handleResetPassword = async () => {
        setIsError(false);
        setErrorText('');

        if (!newPassword || !email || !otp) {
            showToast('Please provide your new password.', 'error');
            setIsError(true);
            setErrorText('Please provide your new password.');
            return;
        }

        try {
            setLoading(true);

            const { error } = await authClient.emailOtp.resetPassword({
                email,
                otp,
                password: newPassword,
            });

            if (error) {
                showToast(error.message || 'There was error occured, please try again.', 'error');
                setIsError(true);
                setErrorText(error.message || 'There was error occured, please try again.');
                return;
            }

            showToast('Your password has been reset successfully, you can now login with your new password.', 'success');
            // handle router here
        } catch (error) {

        } finally {
            setLoading(false);
        }
    };

    return {
        newPassword,
        setNewPassword,
        email,
        setEmail,
        otp,
        setOtp,
        isError,
        errorText,
        handleResetPassword
    }
};