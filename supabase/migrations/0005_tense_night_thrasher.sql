CREATE TABLE IF NOT EXISTS "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"tag" text NOT NULL,
	CONSTRAINT "tags_tag_unique" UNIQUE("tag")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags_to_posts" (
	"tag_id" integer NOT NULL,
	"post_id" integer NOT NULL,
	CONSTRAINT "tags_to_posts_tag_id_post_id_pk" PRIMARY KEY("tag_id","post_id")
);
--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN IF EXISTS "tags";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tags_to_posts" ADD CONSTRAINT "tags_to_posts_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tags_to_posts" ADD CONSTRAINT "tags_to_posts_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
