ALTER TABLE "users" ADD COLUMN "uuid" text;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_uuid_unique" UNIQUE("uuid");