export interface Comment {
    id: string;
    username: string;
    avatar: string;
    text: string;
    likes: number;
    timestamp: string;
    isVerified?: boolean;
    replies?: Comment[];
}

export const fakeComments: Comment[] = [
    {
        id: "1",
        username: "dancing_queen_23",
        avatar: "https://i.pravatar.cc/150?img=1",
        text: "This is literally the best thing I've seen all day 😂😂😂",
        likes: 12453,
        timestamp: "2h ago",
        isVerified: false,
        replies: [
            {
                id: "1a",
                username: "vibes_only",
                avatar: "https://i.pravatar.cc/150?img=2",
                text: "FR FR no cap 🔥",
                likes: 234,
                timestamp: "1h ago",
            }
        ]
    },
    {
        id: "2",
        username: "chef_mike_official",
        avatar: "https://i.pravatar.cc/150?img=3",
        text: "I need the recipe ASAP! 👨‍🍳",
        likes: 8921,
        timestamp: "5h ago",
        isVerified: true,
    },
    {
        id: "3",
        username: "fitness_journey_2024",
        avatar: "https://i.pravatar.cc/150?img=4",
        text: "Tag someone who needs to see this 💪",
        likes: 5643,
        timestamp: "12h ago",
        isVerified: false,
    },
    {
        id: "4",
        username: "memegod",
        avatar: "https://i.pravatar.cc/150?img=5",
        text: "Not me watching this 20 times in a row 💀",
        likes: 15789,
        timestamp: "1d ago",
        isVerified: false,
        replies: [
            {
                id: "4a",
                username: "relatable_content",
                avatar: "https://i.pravatar.cc/150?img=6",
                text: "Same lmao",
                likes: 890,
                timestamp: "23h ago",
            },
            {
                id: "4b",
                username: "night_owl_vibes",
                avatar: "https://i.pravatar.cc/150?img=7",
                text: "It's 3am and I can't stop 😭",
                likes: 456,
                timestamp: "22h ago",
            }
        ]
    },
    {
        id: "5",
        username: "travel_addict_99",
        avatar: "https://i.pravatar.cc/150?img=8",
        text: "Where is this? I need to go there! 🌍✈️",
        likes: 3421,
        timestamp: "2d ago",
        isVerified: false,
    },
    {
        id: "6",
        username: "cat_lover_forever",
        avatar: "https://i.pravatar.cc/150?img=9",
        text: "My cat does this too!! 😻",
        likes: 9876,
        timestamp: "3d ago",
        isVerified: false,
    },
    {
        id: "7",
        username: "tech_guru_pro",
        avatar: "https://i.pravatar.cc/150?img=10",
        text: "The editing on this is insane 🎬🔥",
        likes: 7234,
        timestamp: "4d ago",
        isVerified: true,
    },
    {
        id: "8",
        username: "random_thoughts_daily",
        avatar: "https://i.pravatar.cc/150?img=11",
        text: "POV: You're here from the FYP 👀",
        likes: 11234,
        timestamp: "5d ago",
        isVerified: false,
    },
    {
        id: "9",
        username: "music_producer_beats",
        avatar: "https://i.pravatar.cc/150?img=12",
        text: "What's the song name? Shazam isn't working 🎵",
        likes: 4567,
        timestamp: "6d ago",
        isVerified: true,
        replies: [
            {
                id: "9a",
                username: "helpful_stranger",
                avatar: "https://i.pravatar.cc/150?img=13",
                text: "Darude - Sandstorm 😂",
                likes: 1234,
                timestamp: "5d ago",
            }
        ]
    },
    {
        id: "10",
        username: "aesthetic_life",
        avatar: "https://i.pravatar.cc/150?img=14",
        text: "This gives me so much serotonin ✨💕",
        likes: 6789,
        timestamp: "1w ago",
        isVerified: false,
    },
    {
        id: "11",
        username: "comedian_official",
        avatar: "https://i.pravatar.cc/150?img=15",
        text: "Why is this so accurate 💀💀💀",
        likes: 13456,
        timestamp: "1w ago",
        isVerified: true,
    },
    {
        id: "12",
        username: "fashion_icon_styled",
        avatar: "https://i.pravatar.cc/150?img=16",
        text: "Where did you get that outfit?! 😍👗",
        likes: 5432,
        timestamp: "1w ago",
        isVerified: false,
    },
    {
        id: "13",
        username: "gamer_pro_2024",
        avatar: "https://i.pravatar.cc/150?img=17",
        text: "NPC behavior 🤖",
        likes: 8765,
        timestamp: "2w ago",
        isVerified: false,
    },
    {
        id: "14",
        username: "wholesome_content",
        avatar: "https://i.pravatar.cc/150?img=18",
        text: "This made my day, thank you! 🥺💛",
        likes: 4321,
        timestamp: "2w ago",
        isVerified: false,
    },
    {
        id: "15",
        username: "savage_replies",
        avatar: "https://i.pravatar.cc/150?img=19",
        text: "Bro really said 💀",
        likes: 9999,
        timestamp: "3w ago",
        isVerified: false,
    }
];