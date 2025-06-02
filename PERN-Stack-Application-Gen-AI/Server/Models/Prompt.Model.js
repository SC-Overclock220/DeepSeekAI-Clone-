export const createPromptTable = ` CREATE TABLE IF NOT EXISTS prompts (
    id SERIAL PRIMARY KEY,
    userid INTEGER NOT NULL,
    createdby VARCHAR(50) NOT NULL,
    prompttext VARCHAR NOT NULL,
    promptresponse VARCHAR,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (createdby) REFERENCES users (username)
    ON DELETE CASCADE,
    FOREIGN KEY (userid) REFERENCES users (id)
    ON DELETE CASCADE
    
);`