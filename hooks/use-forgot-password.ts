import { useLoading } from "@/context/loading-context";
import { useToast } from "@/context/toast-context";
import { authClient } from "@/lib/auth-client";
import { router } from "expo-router";
import { useState } from "react";

export const useForgotPassword = () => {
    const { setLoading } = useLoading();
    const { showToast } = useToast();

    const [authMethod, setAuthMethod] = useState<'send-otp' | 'verify-otp' | 'reset-password'>('send-otp');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleRequestOtp = async () => {
        setIsError(false);
        setErrorText('');

        if (!email) {
            showToast('Please provide your email address.', 'error');
            setIsError(true);
            setErrorText('Please provide your email address.');
            return;
        }

        try {
            setLoading(true);

            const { error } = await authClient.forgetPassword.emailOtp({
                email
            });

            if (error) {
                showToast(error.message || 'There was error occured, please try again.', 'error');
                setIsError(true);
                setErrorText(error.message || 'There was error occured, please try again.');
                return;
            }

            showToast('We have send you a verification code to your email address.', 'success');
            setAuthMethod('verify-otp');
        } catch (error: any) {
            showToast(error.message || 'You lost connection with network, please try again later', 'error');
            setIsError(true);
            setErrorText(error.message || 'There was error occured, please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyPassword = async () => {
        setIsError(false);
        setErrorText('');

        if (!otp) {
            showToast('Please provide OTP sended to you.', 'error');
            setIsError(true);
            setErrorText('Please provide OTP sended to you.');
            return;
        }

        try {
            setLoading(true);

            const { error } = await authClient.emailOtp.checkVerificationOtp({
                email,
                type: "forget-password",
                otp,
            });

            if (error) {
                showToast(error.message || 'There was error occured, please try again.', 'error');
                setIsError(true);
                setErrorText(error.message || 'There was error occured, please try again.');
                return;
            }

            showToast('Your verification code has been verified successfully, you can reset your password now.', 'success');
            setAuthMethod('reset-password');
        } catch (error: any) {
            showToast(error.message || 'You lost connection with network, please try again later', 'error');
            setIsError(true);
            setErrorText(error.message || 'There was error occured, please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        setIsError(false);
        setErrorText('');

        if (!newPassword || !confirmNewPassword) {
            showToast('Please provide your new password.', 'error');
            setIsError(true);
            setErrorText('Please provide your new password.');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            showToast('Password confirmation dose not match.', 'error');
            setIsError(true);
            setErrorText('Password confirmation dose not match.');
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
            router.replace('/');
        } catch (error) {

        } finally {
            setLoading(false);
        }
    };

    return {
        authMethod,
        email,
        setEmail,
        otp,
        setOtp,
        isError,
        errorText,
        newPassword,
        setNewPassword,
        confirmNewPassword,
        setConfirmNewPassword,
        handleRequestOtp,
        handleVerifyPassword,
        handleResetPassword
    }
};