-- DropForeignKey
ALTER TABLE "Blogs" DROP CONSTRAINT "Blogs_authorId_fkey";

-- AddForeignKey
ALTER TABLE "Blogs" ADD CONSTRAINT "Blogs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
