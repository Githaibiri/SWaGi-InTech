-- ===========================================================
-- SWaGi InTech...
-- Initial Database Schema
-- Version: 0.1.0
-- ===========================================================

CREATE TABLE IF NOT EXISTS tenants (

    id TEXT PRIMARY KEY,

    business_name TEXT NOT NULL,

    workspace TEXT NOT NULL UNIQUE,

    email TEXT NOT NULL,

    phone TEXT,

    status TEXT NOT NULL DEFAULT 'active',

    created_at TEXT NOT NULL,

    updated_at TEXT NOT NULL

);

CREATE TABLE IF NOT EXISTS admin_users (

    id TEXT PRIMARY KEY,

    tenant_id TEXT,

    username TEXT NOT NULL UNIQUE,

    email TEXT NOT NULL UNIQUE,

    password_hash TEXT NOT NULL,

    full_name TEXT NOT NULL,

    role TEXT NOT NULL,

    theme TEXT DEFAULT 'system',

    is_active INTEGER DEFAULT 1,

    last_login_at TEXT,

    created_at TEXT NOT NULL,

    updated_at TEXT NOT NULL,

    FOREIGN KEY (tenant_id)
        REFERENCES tenants(id)

);

CREATE TABLE IF NOT EXISTS packages (

    id TEXT PRIMARY KEY,

    tenant_id TEXT NOT NULL,

    package_name TEXT NOT NULL,

    description TEXT,

    price REAL NOT NULL,

    duration_minutes INTEGER,

    data_limit_mb INTEGER,

    package_type TEXT NOT NULL DEFAULT 'time',

    is_active INTEGER DEFAULT 1,

    created_at TEXT NOT NULL,

    updated_at TEXT NOT NULL,

    FOREIGN KEY (tenant_id)
        REFERENCES tenants(id)

);

CREATE TABLE IF NOT EXISTS customers (

    id TEXT PRIMARY KEY,

    tenant_id TEXT NOT NULL,

    full_name TEXT,

    phone TEXT NOT NULL,

    email TEXT,

    username TEXT,

    password_hash TEXT,

    account_status TEXT NOT NULL DEFAULT 'inactive',

    created_at TEXT NOT NULL,

    updated_at TEXT NOT NULL,

    FOREIGN KEY (tenant_id)
        REFERENCES tenants(id)

);