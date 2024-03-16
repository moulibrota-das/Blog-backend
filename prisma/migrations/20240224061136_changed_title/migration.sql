/*
  Warnings:

  - You are about to drop the column `author_id` on the `Blogs` table. All the data in the column will be lost.
  - You are about to drop the column `desc` on the `Blogs` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Blogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Blogs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Blogs" DROP CONSTRAINT "Blogs_author_id_fkey";

-- AlterTable
ALTER TABLE "Blogs" DROP COLUMN "author_id",
DROP COLUMN "desc",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Blogs" ADD CONSTRAINT "Blogs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
