-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "author_full_name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "ups" INTEGER NOT NULL,
    "comments_quantity" INTEGER NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);
