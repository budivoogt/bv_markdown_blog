ALTER TABLE "tags" RENAME COLUMN "tag" TO "name";--> statement-breakpoint
ALTER TABLE "tags" DROP CONSTRAINT "tags_tag_unique";--> statement-breakpoint
ALTER TABLE "tags" ADD CONSTRAINT "tags_name_unique" UNIQUE("name");