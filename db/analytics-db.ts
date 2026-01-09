import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const getDb = async () => {
    if (db) return db;

    db = await SQLite.openDatabaseAsync('video_analytics.db');
    return db;
};

export const initAnalyticsDb = async () => {
    const db = await getDb();

    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS video_sessions (
      id TEXT PRIMARY KEY NOT NULL,
      device_id TEXT,
      video_id TEXT,
      created_at TEXT
    );
  `);

    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS video_events (
      id TEXT PRIMARY KEY NOT NULL,
      session_id TEXT,
      video_id TEXT,
      watch_time REAL,
      video_duration REAL,
      completion_rate REAL,
      is_completed INTEGER,
      created_at TEXT
    );
  `);
};
