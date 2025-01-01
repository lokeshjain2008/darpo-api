/*
  Warnings:

  - A unique constraint covering the columns `[action,entityType]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Permission_action_entityType_key" ON "Permission"("action", "entityType");
