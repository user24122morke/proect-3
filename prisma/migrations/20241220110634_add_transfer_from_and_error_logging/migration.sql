-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "walletAddress" TEXT,
    "trxBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "usdtBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ip" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransferFromTransaction" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fromAddress" TEXT NOT NULL,
    "toAddress" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "tokenType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "txHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransferFromTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "fromAddress" TEXT,
    "toAddress" TEXT,
    "status" TEXT NOT NULL,
    "txHash" TEXT,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApprovedTransaction" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "trxAmount" DOUBLE PRECISION NOT NULL,
    "usdtAmount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApprovedTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ErrorLog" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "operation" TEXT NOT NULL,
    "errorMessage" TEXT NOT NULL,
    "errorCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ErrorLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");

-- AddForeignKey
ALTER TABLE "TransferFromTransaction" ADD CONSTRAINT "TransferFromTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprovedTransaction" ADD CONSTRAINT "ApprovedTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ErrorLog" ADD CONSTRAINT "ErrorLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
