/*
  Warnings:

  - The primary key for the `Bookmark` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Bookmark` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,blog_id]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_user_id_blog_id_key" ON "Bookmark"("user_id", "blog_id");
