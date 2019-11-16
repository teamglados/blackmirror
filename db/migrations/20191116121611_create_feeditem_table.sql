-- migrate:up
CREATE TABLE feeditem (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID,
            like_count INTEGER DEFAULT 0,
            post_text TEXT,
            post_image TEXT,
            parent_id UUID,
            creator_id UUID,
            timestamp_ms_created BIGINT NOT NULL DEFAULT (extract(epoch from now()) * 1000),
            timestamp_ms_updated BIGINT
        );
-- migrate:down
