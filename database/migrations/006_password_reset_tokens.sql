CREATE TABLE IF NOT EXISTS password_reset_tokens (

    id TEXT PRIMARY KEY,

    user_id TEXT NOT NULL,

    reset_code TEXT NOT NULL,

    expires_at TEXT NOT NULL,

    used INTEGER NOT NULL DEFAULT 0,

    created_at TEXT NOT NULL,

    FOREIGN KEY(user_id)
    REFERENCES admin_users(id)

);

CREATE INDEX IF NOT EXISTS idx_password_reset_user
ON password_reset_tokens(user_id);

CREATE INDEX IF NOT EXISTS idx_password_reset_code
ON password_reset_tokens(reset_code);