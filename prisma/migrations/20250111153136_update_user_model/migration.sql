/*
  Warnings:

  - You are about to alter the column `trxBalance` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `usdtBalance` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.

*/
-- DropForeignKey
ALTER TABLE "ApprovedTransaction" DROP CONSTRAINT "ApprovedTransaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "ErrorLog" DROP CONSTRAINT "ErrorLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "trxBalance" SET DEFAULT 0,
ALTER COLUMN "trxBalance" SET DATA TYPE BIGINT,
ALTER COLUMN "usdtBalance" SET DEFAULT 0,
ALTER COLUMN "usdtBalance" SET DATA TYPE BIGINT;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprovedTransaction" ADD CONSTRAINT "ApprovedTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ErrorLog" ADD CONSTRAINT "ErrorLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
