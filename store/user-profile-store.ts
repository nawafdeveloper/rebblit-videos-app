import { authClient } from "@/lib/auth-client";
import { create } from "zustand";

type Profile = {
    profileId: string;
    userId: string;
    displayName: string;
    biography: string;
    avatarUrl: string;
    followerCount: number;
    followingCount: number;
    postsCount: number;
    gender: "male" | "female" | "other";
    profileType: "public" | "private";
    birthday: Date | null;
    location: string | null;
    websiteUrl: string | null;
    createdAt: string;
    updatedAt: string;
};

type ApiResponse = {
    data: Profile;
};

type FetchProfileOptions = {
    showToast: (msg: string, type?: "error" | "success") => void;
};

type UserProfileState = {
    profile: Profile | null;
    isLoading: boolean;
    error: string | null;

    fetchProfile: (options: FetchProfileOptions) => Promise<void>;
    updateProfile: (data: Partial<Profile>) => void;
    resetProfile: () => void;
};

export const useUserProfileStore = create<UserProfileState>((set) => ({
    profile: null,
    isLoading: false,
    error: null,

    fetchProfile: async ({ showToast }) => {
        set({ isLoading: true, error: null });

        try {
            const res = await authClient.$fetch<ApiResponse>(
                `${process.env.EXPO_PUBLIC_API_URL}/api/v1/fetch/my-profile`,
                { method: "GET" }
            );

            if (res.error) {
                showToast(
                    res.error.message || "There was an error, please try again.",
                    "error"
                );
                set({ isLoading: false });
                return;
            }

            console.log(res.data.data)

            set({
                profile: res.data.data,
                isLoading: false,
            });
        } catch (err: any) {
            set({
                error: err.message ?? "Something went wrong",
                isLoading: false,
            });

            showToast("Something went wrong, please try again.", "error");
        }
    },

    updateProfile: (data) =>
        set((state) => ({
            profile: state.profile
                ? { ...state.profile, ...data }
                : state.profile,
        })),

    resetProfile: () => set({ profile: null }),
}));
