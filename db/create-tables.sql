DROP TABLE IF EXISTS attachments;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS user_in_channel;
DROP TABLE IF EXISTS channels;
DROP TABLE IF EXISTS users;

CREATE TABLE channels (
    id          BIGSERIAL  PRIMARY KEY,
    name        TEXT       NOT NULL,
    parent_id   BIGINT     DEFAULT NULL
                        CHECK (parent_id IS NULL OR parent_id > 0)
    -- _EncKey_parent      BYTEA   DEFAULT NULL,
    -- CHECK (
    --     (parent_id IS NULL
    --         AND _EncKey_parent IS NULL
    --     )
    --     OR
    --     (parent_id IS NOT NULL
    --         AND _EncKey_parent IS NOT NULL
    --         AND parent_id > 0
    --     )
    -- )
);

CREATE TABLE users (
    id         BIGSERIAL    PRIMARY KEY,
    email           TEXT    NOT NULL UNIQUE,
    -- email_pass_hash BYTEA   NOT NULL,
    -- PubKey          BYTEA   NOT NULL UNIQUE,
    -- _PrivKey        BYTEA   NOT NULL,
    name       TEXT    NOT NULL,
    surname    TEXT    NOT NULL
);

CREATE TABLE user_in_channel (
    user_id         BIGINT  NOT NULL    REFERENCES users(id)    ON DELETE CASCADE,
    channel_id      INT     NOT NULL    REFERENCES channels(id) ON DELETE CASCADE,
    -- user_role       INT     NOT NULL,  -- каждое право пользователя определяется битом в инте
    -- _EncKey_user    BYTEA   NOT NULL,
    preferences     JSON    DEFAULT NULL,
    PRIMARY KEY (user_id, channel_id)
);

CREATE TABLE messages (
    id              BIGSERIAL NOT NULL UNIQUE,
    channel_id      INT     NOT NULL        REFERENCES channels(id),
    answer_to_id    INT     DEFAULT NULL    REFERENCES messages(id),
    user_id         BIGINT  NOT NULL,
    date_time       TIMESTAMP  NOT NULL DEFAULT current_timestamp,
    _text   TEXT   NOT NULL,
    PRIMARY KEY (id, channel_id)
);

-- CREATE TABLE attachments (
--     message_id       INT    NOT NULL    REFERENCES messages(id) ON DELETE CASCADE,
--     attachment_order INT    NOT NULL,
--     format           TEXT   NOT NULL,
--     -- BLOB не поддерживается постгресом, нужно подобрать другой тип
--     _file            BYTEA  NOT NULL,
--     PRIMARY KEY (message_id, attachment_order)
-- );
