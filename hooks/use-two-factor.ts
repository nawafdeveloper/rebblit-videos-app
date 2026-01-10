import { useLoading } from "@/context/loading-context";
import { useToast } from "@/context/toast-context";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export const useTwoFactor = () => {
    const { setLoading } = useLoading();
    const { showToast } = useToast();

    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState('');

    const handleEnableTwoFactor = async () => {
        if (!password) {
            showToast('Please insure you prive your password to enable Two Factor verification.', 'error');
            return;
        }

        try {
            setLoading(true);

            const { error } = await authClient.twoFactor.enable({
                password,
            });

            if (error) {
                showToast(error.message || 'There was error occured, please try again.', 'error');
                setIsError(true);
                setErrorText(error.message || 'There was error occured, please try again.');
                return;
            }

            showToast('Two Factor verification sercurity has been enabled successfully.', 'success');
        } catch (error: any) {
            showToast(error.message || 'You lost connection with network, please try again later', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDisableTwoFactor = async () => {
        if (!password) {
            showToast('Please insure you prive your password to enable Two Factor verification.', 'error');
            return;
        }

        try {
            setLoading(true);

            const { error } = await authClient.twoFactor.disable({
                password
            });

            if (error) {
                showToast(error.message || 'There was error occured, please try again.', 'error');
                setIsError(true);
                setErrorText(error.message || 'There was error occured, please try again.');
                return;
            }

            showToast('Two Factor verification sercurity has been disabled successfully.', 'success');
        } catch (error: any) {
            showToast(error.message || 'You lost connection with network, please try again later', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp) {
            showToast('Please insure you prive your password to enable Two Factor verification.', 'error');
            return;
        }

        try {
            setLoading(true);

            const { error } = await authClient.twoFactor.verifyOtp({
                code: otp,
                trustDevice: true,
            });

            if (error) {
                showToast(error.message || 'There was error occured, please try again.', 'error');
                setIsError(true);
                setErrorText(error.message || 'There was error occured, please try again.');
                return;
            }

        } catch (error: any) {
            showToast(error.message || 'You lost connection with network, please try again later', 'error');
        } finally {
            setLoading(false);
        }
    };

    return {
        password,
        otp,
        isError,
        errorText,
        setPassword,
        setOtp,
        handleDisableTwoFactor,
        handleEnableTwoFactor,
        handleVerifyOtp
    }
};