-- migrate:up
CREATE TABLE messages (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID,
            context TEXT
        );
-- migrate:down

