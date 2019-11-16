-- migrate:up
CREATE TABLE github_stats (
            username TEXT PRIMARY KEY,
            first_name TEXT,
            last_name TEXT,
            bio TEXT,
            country TEXT,
            is_pro_user BOOLEAN,
            organizations TEXT ARRAY,
            profile_picture_url TEXT,
            repositories TEXT ARRAY,
            used_languages TEXT ARRAY,
            stars INTEGER,
            followers INTEGER,
            following INTEGER,
            image TEXT,
            timestamp_ms_created BIGINT NOT NULL DEFAULT (extract(epoch from now()) * 1000),
            timestamp_ms_updated BIGINT
);

-- migrate:down
