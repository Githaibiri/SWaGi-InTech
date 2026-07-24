CREATE TABLE IF NOT EXISTS tenants (

    id TEXT PRIMARY KEY,

    business_name TEXT NOT NULL,

    contact_person TEXT NOT NULL,

    email TEXT NOT NULL UNIQUE,

    phone TEXT NOT NULL,

    status TEXT NOT NULL DEFAULT 'ACTIVE',

    subscription_status TEXT NOT NULL DEFAULT 'TRIAL',

    created_at TEXT NOT NULL,

    updated_at TEXT NOT NULL

);