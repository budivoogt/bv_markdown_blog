-- Inserting users
INSERT INTO users (id, firstName, lastName, email, emailVerified)
VALUES
-- Replace the values below with actual data from userSeeds
('user1_id', 'user1_firstName', 'user1_lastName', 'user1_email', user1_emailVerified),
('user2_id', 'user2_firstName', 'user2_lastName', 'user2_email', user2_emailVerified),
-- Add more users as needed...

-- Inserting posts
INSERT INTO posts (id, title, description, body, slug, tags, authorId)
VALUES
-- Replace the values below with actual data from postSeeds
('post1_id', 'post1_title', 'post1_description', 'post1_body', 'post1_slug', 'post1_tags', 'post1_authorId'),
('post2_id', 'post2_title', 'post2_description', 'post2_body', 'post2_slug', 'post2_tags', 'post2_authorId');
-- Add more posts as needed...