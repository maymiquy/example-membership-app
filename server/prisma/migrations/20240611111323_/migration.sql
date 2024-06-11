-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_membershipType_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "membershipType" DROP NOT NULL,
ALTER COLUMN "membershipType" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_membershipType_fkey" FOREIGN KEY ("membershipType") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;
