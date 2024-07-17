/*
  Warnings:

  - Added the required column `type` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "type" TEXT NOT NULL;
