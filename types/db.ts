type Thumbnail = {
    thumb_id: string;
    thumb_uri: string;
    thumb_w: number;
    thumb_h: number;
}

type Video = {
    video_id: string;
    length_in_milli_seconds: number;
    user_id: string;
    post_id: string;
    thumbnail: Thumbnail;
    meme_type: string;
    video_uri: string;
    video_codec_type: string;
    video_format: string;
    video_h: number;
    video_w: number;
    video_bit_rate: number;
    video_ratio: string;
    video_size: number;
    video_title: string;
    created_at: Date;
    updated_at: Date;
    video_fps: number;
}

type Reply = {
    reply_id: string;
    reply_conent: string;
    author_id: string;
    like_count: number;
    dislike_count: number;
    created_at: Date;
    updated_at: Date;
};

type Comment = {
    comment_id: string;
    post_id: string;
    comment_content: string;
    author_id: string;
    like_count: number;
    dislike_count: number;
    reply_count: number;
    is_post_owner: boolean;
    reply_content: Reply;
    created_at: Date;
    updated_at: Date;
};

type FollowStatus =
    | 'active'
    | 'pending'
    | 'blocked'
    | 'muted';

type FollowRequestStatus =
    | 'pending'
    | 'accepted'
    | 'rejected'
    | 'cancelled';

type FollowSuggestionReason =
    | 'mutual_friends'
    | 'similar_interests'
    | 'popular'
    | 'contacts'
    | 'location'
    | 'trending';

type UserFollow = {
    id: string;
    follower_id: string;
    following_id: string;
    status: FollowStatus;
    notification_enabled: boolean;
    show_in_feed: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

type FollowRequest = {
    id: string;
    requester_id: string;
    target_id: string;
    status: FollowRequestStatus;
    message: string | null;
    requested_at: Date;
    responded_at: Date | null;
    expires_at: Date | null;
}

type UserBlock = {
    id: string;
    blocker_id: string;
    blocked_id: string;
    reason: string | null;
    created_at: Date;
}

type FollowSuggestion = {
    id: string;
    user_id: string;
    suggested_user_id: string;
    score: number; // 0.0000 → 1.0000
    reason: FollowSuggestionReason | null;
    mutual_friend_count: number;
    shown_count: number;
    dismissed: boolean;
    created_at: Date;
    last_shown_at: Date | null;
    dismissed_at: Date | null;
}