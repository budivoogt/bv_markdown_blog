ALTER TABLE posts ADD `slug` text NOT NULL;--> statement-breakpoint
ALTER TABLE posts ADD `tags` text;--> statement-breakpoint
ALTER TABLE posts ADD `updated_at` integer DEFAULT (strftime('%s','now'));--> statement-breakpoint
CREATE UNIQUE INDEX `posts_slug_unique` ON `posts` (`slug`);