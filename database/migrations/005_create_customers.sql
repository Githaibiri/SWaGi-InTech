CREATE TABLE IF NOT EXISTS customers (

    id TEXT PRIMARY KEY,

    tenant_id TEXT NOT NULL,

    full_name TEXT NOT NULL,

    phone TEXT NOT NULL,

    email TEXT,

    status TEXT NOT NULL DEFAULT 'active',

    created_at TEXT NOT NULL,

    updated_at TEXT NOT NULL,

    FOREIGN KEY (tenant_id)
        REFERENCES tenants(id)
        ON DELETE CASCADE

);