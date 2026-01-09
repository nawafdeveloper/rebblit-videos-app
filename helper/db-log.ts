import { getDb } from "@/db/analytics-db";

export const logAnalyticsDb = async () => {
    const db = await getDb();

    const sessions = await db.getAllAsync(
        'SELECT * FROM video_sessions'
    );

    const events = await db.getAllAsync(
        'SELECT * FROM video_events'
    );

    console.log('[DB] video_sessions:', sessions);
    console.log('[DB] video_events:', events);
};
