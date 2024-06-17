/*
  Warnings:

  - You are about to drop the `Membership` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_membershipType_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "membershipType" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Membership";
