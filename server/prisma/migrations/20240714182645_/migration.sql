/*
  Warnings:

  - You are about to drop the `DailyLimits` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `articleLimit` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoLimit` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "articleLimit" INTEGER NOT NULL,
ADD COLUMN     "resetDailyLimit" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "videoLimit" INTEGER NOT NULL;
