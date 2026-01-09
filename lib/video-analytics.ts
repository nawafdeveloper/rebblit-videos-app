import { getDb } from '@/db/analytics-db';
import * as Device from 'expo-device';
import { generateId } from './generate-id';

export const createVideoSession = async (videoId: string) => {
    const db = await getDb();
    const sessionId = generateId();
    const deviceId = Device.osInternalBuildId ?? 'unknown';
    const createdAt = new Date().toISOString();

    await db.runAsync(
        'INSERT INTO video_sessions (id, device_id, video_id, created_at) VALUES (?, ?, ?, ?)',
        sessionId,
        deviceId,
        videoId,
        createdAt
    );

    console.log()

    return sessionId;
};

export const addViewEvent = async ({
    sessionId,
    videoId,
    watchTime,
    duration
}: {
    sessionId: string;
    videoId: string;
    watchTime: number;
    duration: number;
}) => {
    const db = await getDb();

    const completionRate = duration > 0 ? watchTime / duration : 0;
    const isCompleted = completionRate >= 0.95 ? 1 : 0;

    await db.runAsync(
        `INSERT INTO video_events (
      id,
      session_id,
      video_id,
      watch_time,
      video_duration,
      completion_rate,
      is_completed,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        generateId(),
        sessionId,
        videoId,
        watchTime,
        duration,
        completionRate,
        isCompleted,
        new Date().toISOString()
    );
};
