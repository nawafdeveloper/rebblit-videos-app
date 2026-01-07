import { useLoading } from "@/context/loading-context";
import { useToast } from "@/context/toast-context";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export const useNewProfile = () => {
    const { showToast } = useToast();
    const { setLoading } = useLoading();
    const { data: session } = authClient.useSession();

    const [birthday, setBirthday] = useState<Date | null>(null);
    const [displayName, setDisplayName] = useState(session?.user.displayUsername);
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [preferedLang, setPreferedLang] = useState('');
    const [biography, setBiography] = useState('');

    const [avatar, setAvatar] = useState('');
    const [avatarName, setAvatarName] = useState('');
    const [avatarType, setAvatarType] = useState('');

    const [screen, setScreen] = useState<'birthday' | 'display-name' | 'avatar' | 'biography' | 'gender' | 'prefered-lang'>('birthday');

    const handleCreateProfile = async () => {
        if (!birthday || !displayName) {
            showToast('Please complete your profile, some information are missing.', 'error');
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData;

            formData.append("display_name", displayName);
            formData.append("biography", biography ?? "");
            formData.append("prefered_language", preferedLang);
            formData.append("gender", gender);

            if (avatar) {
                formData.append("avatar_raw", {
                    uri: avatar,
                    name: avatarName,
                    type: avatarType,
                } as any);
            }

            if (!session?.user.id) {
                showToast('Unauthorized', 'error');
                return;
            }

            const res = await fetch(`http://localhost:3000/api/v1/create/profile`, {
                method: "POST",
                headers: {
                    "x-user-id": session?.user.id,
                },
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                showToast(data.message || 'There was error occured, please try again.', 'error');
                return;
            }

            showToast(data.message || 'Your profile has been created successfully', 'success');
        } catch (error: any) {
            showToast(error.message || 'You lost connection with network, please try again later', 'error');
            return;
        } finally {
            setLoading(false);
        }
    };

    return {
        birthday,
        setBirthday,
        displayName,
        setDisplayName,
        gender,
        setGender,
        preferedLang,
        setPreferedLang,
        biography,
        setBiography,
        avatar,
        setAvatar,
        avatarName,
        setAvatarName,
        avatarType,
        setAvatarType,
        screen,
        setScreen,
        handleCreateProfile
    }
};