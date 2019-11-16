-- migrate:up
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            first_name TEXT,
            last_name TEXT,
            image TEXT,
            keywords TEXT,
            timestamp_ms_created BIGINT NOT NULL DEFAULT (extract(epoch from now()) * 1000)
        );

-- migrate:down
