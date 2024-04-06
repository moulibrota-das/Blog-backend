-- CreateTable
CREATE TABLE "Bookmark" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "blog_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "Blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
