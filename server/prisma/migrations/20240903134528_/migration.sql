/*
  Warnings:

  - You are about to drop the column `stripeId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_stripeId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "stripeId";
