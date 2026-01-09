import { useLoading } from "@/context/loading-context";
import { useToast } from "@/context/toast-context";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export const useUpdatePassword = () => {
    const { showToast } = useToast();
    const { setLoading } = useLoading();

    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmNewPass, setConfirmNewPass] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState('');

    const handleChangePassword = async () => {
        setIsError(false);
        setErrorText('');

        if (!currentPass || !newPass) {
            showToast('Your should fill your current password & your new passowrd.', 'error');
            setIsError(true);
            setErrorText('Your should fill your current password & your new passowrd.');
            return;
        }

        if (newPass !== confirmNewPass) {
            showToast('New password and confirmation new password are not match.', 'error');
            setIsError(true);
            setErrorText('New password and confirmation new password are not match.');
            return;
        }

        try {
            setLoading(true);

            const { error } = await authClient.changePassword({
                newPassword: newPass,
                currentPassword: currentPass,
                revokeOtherSessions: true,
            });

            if (error) {
                showToast(error.message || 'There was error occured, please try again.', 'error');
                setIsError(true);
                setErrorText(error.message || 'There was error occured, please try again.');
                return;
            }

            showToast('Your password has been changed successfully.', 'success');
            setConfirmNewPass('');
            setNewPass('');
            setCurrentPass('');
        } catch (error: any) {
            showToast(error.message || 'You lost connection with network, please try again later', 'error');
            setIsError(true);
            setErrorText(error.message || 'You lost connection with network, please try again later');
            return;
        } finally {
            setLoading(false);
        }
    };

    return {
        currentPass,
        setCurrentPass,
        newPass,
        setNewPass,
        confirmNewPass,
        setConfirmNewPass,
        isError,
        errorText,
        handleChangePassword
    }
};