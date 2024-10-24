-- Table for storing users
CREATE TABLE wg_users (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    clerk_id TEXT NOT NULL,
    username VARCHAR(14) NOT NULL,
    saved_prompts TEXT[], -- Array of saved prompt IDs
    times_upvoted INT[][] -- Array of arrays storing IDs of upvotes
);

-- Table for storing prompts
CREATE TABLE wg_prompts (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    content TEXT NOT NULL
);

-- Table for storing posts
CREATE TABLE wg_posts (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INT REFERENCES wg_users(id) ON DELETE CASCADE, -- References user
    prompt_id INT REFERENCES wg_prompts(id) ON DELETE CASCADE, -- References prompt
    content TEXT NOT NULL,
    words TEXT[] NOT NULL, -- Array of words related to the post
    upvotes INT DEFAULT 0 -- Count of upvotes for the post
);

-- Table for storing individual words with usage stats
CREATE TABLE wg_words (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    word TEXT NOT NULL UNIQUE,
    times_used INT DEFAULT 0, -- Number of times this word has been used
    times_upvoted INT DEFAULT 0 -- Number of upvotes for this word
);

-- Table for storing filler words
CREATE TABLE wg_filler_words (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    word TEXT NOT NULL UNIQUE
);