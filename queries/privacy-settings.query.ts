import { useToast } from "@/context/toast-context";
import { authClient } from "@/lib/auth-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type PrivacySettings = {
    accountPrivacy: "private" | "public";

    newCommentNotification: boolean;
    newFollowNotification: boolean;
    newLikeNotification: boolean;
    newDislikeNotification: boolean;

    autoPlayVideo: boolean;
    autoMuteVideo: boolean;
    enableHdr: boolean;
};

const QUERY_KEY = ["privacy-settings"];

async function fetchPrivacySettings(
    showToast: (msg: string, type?: "error" | "success") => void
): Promise<PrivacySettings | null> {
    const res = await authClient.$fetch<{ data: PrivacySettings }>(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/fetch/my-preferences`,
        { method: "GET" }
    );

    if (res.error) {
        showToast(res.error.message || 'There was error occured during getting your data.', "error");
        return null;
    }

    return res.data.data;
}

async function patchPrivacySettings(
    payload: Partial<PrivacySettings>,
    showToast: (msg: string, type?: "error" | "success") => void
) {
    let endpoint = "";

    if ("accountPrivacy" in payload) {
        endpoint = `${process.env.EXPO_PUBLIC_API_URL}/api/v1/update/my-preference/privacy`;
    } else if (
        "newCommentNotification" in payload ||
        "newFollowNotification" in payload ||
        "newLikeNotification" in payload ||
        "newDislikeNotification" in payload
    ) {
        endpoint = `${process.env.EXPO_PUBLIC_API_URL}/api/v1/update/my-preference/notification`;
    } else if (
        "autoPlayVideo" in payload ||
        "autoMuteVideo" in payload ||
        "enableHdr" in payload
    ) {
        endpoint = `${process.env.EXPO_PUBLIC_API_URL}/api/v1/update/my-preference/playback`;
    } else {
        showToast("Invalid update payload", "error");
        return null;
    }

    const res = await authClient.$fetch<{ message: string }>(
        endpoint,
        {
            method: "PATCH",
            body: payload,
        }
    );

    if (res.error) {
        showToast(res.error.message || 'There was error while sending your request.', "error");
        return null;
    }

    showToast(res.data.message, "success");
    return true;
}

export function usePrivacySettings() {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    const query = useQuery({
        queryKey: QUERY_KEY,
        queryFn: () => fetchPrivacySettings(showToast),
    });

    const mutation = useMutation({
        mutationFn: (payload: Partial<PrivacySettings>) =>
            patchPrivacySettings(payload, showToast),

        onMutate: async (newData) => {
            await queryClient.cancelQueries({ queryKey: QUERY_KEY });

            const previous =
                queryClient.getQueryData<PrivacySettings>(QUERY_KEY);

            queryClient.setQueryData<PrivacySettings>(
                QUERY_KEY,
                (old) => (old ? { ...old, ...newData } : old)
            );

            return { previous };
        },

        onError: (_err, _vars, context) => {
            if (context?.previous) {
                queryClient.setQueryData(QUERY_KEY, context.previous);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
        },
    });

    return {
        data: query.data,
        isLoading: query.isLoading,
        isUpdating: mutation.isPending,
        updateSetting: mutation.mutate,
        refetch: query.refetch,
    };
}
