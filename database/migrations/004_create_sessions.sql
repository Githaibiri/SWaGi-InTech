CREATE TABLE IF NOT EXISTS sessions (

    id TEXT PRIMARY KEY,

    user_id INTEGER NOT NULL,

    token TEXT NOT NULL UNIQUE,

    expires_at TEXT NOT NULL,

    created_at TEXT NOT NULL

);