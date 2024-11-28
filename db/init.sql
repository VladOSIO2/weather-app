BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE user (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
);

CREATE TABLE search_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    search_term VARCHAR(255) NOT NULL,
    user_id UUID NOT NULL REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE favorite_city (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    name VARCHAR(255) NOT NULL,
    user_id UUID NOT NULL REFERENCES user(id) ON DELETE CASCADE,
    weather_api_id VARCHAR(255) NOT NULL,

    UNIQUE (weather_api_id, user_id)
);

COMMIT;