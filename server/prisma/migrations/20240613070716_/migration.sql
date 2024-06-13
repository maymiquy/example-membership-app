/*
  Warnings:

  - You are about to drop the column `maxArticle` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the column `maxVideo` on the `Membership` table. All the data in the column will be lost.
  - Added the required column `price` to the `Membership` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "maxArticle",
DROP COLUMN "maxVideo",
ADD COLUMN     "price" INTEGER NOT NULL,
ALTER COLUMN "type" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stripId" TEXT;

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imgUrl" TEXT NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);
