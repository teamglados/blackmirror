-- migrate:up
CREATE TABLE messages (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            content TEXT,
            user_id UUID,
            image TEXT,
            creator_id UUID,
            timestamp_ms_created BIGINT NOT NULL DEFAULT (extract(epoch from now()) * 1000)
        );


-- migrate:down

