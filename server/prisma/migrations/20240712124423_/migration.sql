/*
  Warnings:

  - The primary key for the `Article` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Video` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `desc` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `Video` table. All the data in the column will be lost.
  - Added the required column `description` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailUrl` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP CONSTRAINT "Article_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Article_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Article_id_seq";

-- AlterTable
ALTER TABLE "Video" DROP CONSTRAINT "Video_pkey",
DROP COLUMN "desc",
DROP COLUMN "releaseDate",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "thumbnailUrl" TEXT NOT NULL,
ADD COLUMN     "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "videoUrl" DROP NOT NULL,
ADD CONSTRAINT "Video_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Video_id_seq";
