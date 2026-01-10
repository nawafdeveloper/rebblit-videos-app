import { authClient } from "@/lib/auth-client";
import { create } from "zustand";

type Screen =
    | 'birthday'
    | 'display-name'
    | 'avatar'
    | 'biography'
    | 'gender'
    | 'prefered-lang';

interface NewProfileStore {
    birthday: Date | null;
    setBirthday: (date: Date | null) => void;

    displayName: string;
    setDisplayName: (name: string) => void;

    gender: 'male' | 'female';
    setGender: (gender: 'male' | 'female') => void;

    preferedLang: string;
    setPreferedLang: (lang: string) => void;

    biography: string;
    setBiography: (bio: string) => void;

    avatar: string;
    setAvatar: (uri: string) => void;

    avatarName: string;
    setAvatarName: (name: string) => void;

    avatarType: string;
    setAvatarType: (type: string) => void;

    screen: Screen;
    setScreen: (screen: Screen) => void;

    handleCreateProfile: (options: {
        userId: string;
        showToast: (msg: string, type?: 'error' | 'success') => void;
        setLoading: (loading: boolean) => void;
    }) => Promise<void>;
}

export const useNewProfileStore = create<NewProfileStore>((set, get) => ({
    birthday: null,
    setBirthday: (date) => set({ birthday: date }),

    displayName: '',
    setDisplayName: (name) => set({ displayName: name }),

    gender: 'male',
    setGender: (gender) => set({ gender }),

    preferedLang: '',
    setPreferedLang: (lang) => set({ preferedLang: lang }),

    biography: '',
    setBiography: (bio) => set({ biography: bio }),

    avatar: '',
    setAvatar: (uri) => set({ avatar: uri }),

    avatarName: '',
    setAvatarName: (name) => set({ avatarName: name }),

    avatarType: '',
    setAvatarType: (type) => set({ avatarType: type }),

    screen: 'birthday',
    setScreen: (screen) => set({ screen }),

    handleCreateProfile: async ({ userId, showToast, setLoading }) => {
        const { birthday, displayName, gender, preferedLang, biography, avatar, avatarName, avatarType } = get();

        if (!birthday || !displayName) {
            showToast('Please complete your profile, some information are missing.', 'error');
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("display_name", displayName);
            formData.append("biography", biography ?? "");
            formData.append("prefered_language", preferedLang);
            formData.append("gender", gender);
            formData.append("birthday", birthday.toISOString().split('T')[0]);

            if (avatar) {
                formData.append("avatar_raw", {
                    uri: avatar,
                    name: avatarName,
                    type: avatarType,
                } as any);
            }

            if (!userId) {
                showToast('Unauthorized', 'error');
                return;
            }

            const res = await authClient.$fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/create/profile`, {
                method: "POST",
                headers: {
                    "x-user-id": userId,
                },
                body: formData,
            });

            if (res.error) {
                console.log('error: ', res.error);
                showToast(res.error.message || 'There was an error, please try again.', 'error');
                return;
            }

            showToast('Your profile has been created successfully', 'success');
        } catch (error: any) {
            showToast(error.message || 'Network error, please try again later', 'error');
        } finally {
            setLoading(false);
        }
    },
}));
