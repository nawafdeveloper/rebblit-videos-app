import { useLoading } from "@/context/loading-context";
import { useToast } from "@/context/toast-context";
import { authClient } from "@/lib/auth-client";
import { router } from "expo-router";
import { useState } from "react";

export const useSendEmailOTP = () => {
    const { showToast } = useToast();
    const { setLoading } = useLoading();

    const handleSendOtp = async (email: string) => {
        if (!email) {
            showToast('Email address is missing, please provide your email address.', 'error');
            return;
        }

        try {
            setLoading(true);

            const { error } = await authClient.emailOtp.sendVerificationOtp({
                email,
                type: "email-verification",
            });

            if (error) {
                showToast(error.message || 'There was error occured, please try again.', 'error');
                return;
            }

            showToast('Verification code has send to your email address', 'success');
            router.push({ pathname: '/(tabs)/profile/settings/[settingId]', params: { settingId: 'Confirm Email' } })
        } catch (error: any) {
            showToast(error.message || 'You lost connection with network, please try again later', 'error');
        } finally {
            setLoading(false);
        }
    };

    return {
        handleSendOtp
    }
};

export const useConfirmEmail = () => {
    const { showToast } = useToast();
    const { setLoading } = useLoading();

    const [otp, setOtp] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState('');

    const handleVerifyOtp = async (email: string) => {
        setIsError(false);
        setErrorText('');

        if (!email) {
            showToast('Email address is missing, please provide your email address.', 'error');
            return;
        }

        if (!otp) {
            showToast('Please enter the correct verification code sent to you.', 'error');
            setIsError(true);
            setErrorText('Please enter the correct verification code sent to you.');
            return;
        }

        try {
            setLoading(true);

            const { error } = await authClient.emailOtp.verifyEmail({
                email,
                otp
            });

            if (error) {
                showToast(error.message || 'There was error occured, please try again.', 'error');
                return;
            }

            showToast('Your email address has been verified successfully.', 'success');
            router.replace('/(tabs)/profile');
        } catch (error: any) {
            showToast(error.message || 'You lost connection with network, please try again later', 'error');
        } finally {
            setLoading(false);
        }
    };

    return {
        otp,
        setOtp,
        errorText,
        isError,
        handleVerifyOtp
    }
};