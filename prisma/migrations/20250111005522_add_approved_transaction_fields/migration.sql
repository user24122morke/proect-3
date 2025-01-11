/*
  Warnings:

  - Added the required column `network` to the `ApprovedTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionType` to the `ApprovedTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApprovedTransaction" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "blockNumber" INTEGER,
ADD COLUMN     "fee" DOUBLE PRECISION,
ADD COLUMN     "network" TEXT NOT NULL,
ADD COLUMN     "spender" TEXT,
ADD COLUMN     "transactionHash" TEXT,
ADD COLUMN     "transactionType" TEXT NOT NULL;
