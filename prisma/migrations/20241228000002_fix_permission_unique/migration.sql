-- Rename column
ALTER TABLE "Permission" RENAME COLUMN "resource" TO "entityType";

-- Add unique constraint
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_action_entityType_key" UNIQUE ("action", "entityType");