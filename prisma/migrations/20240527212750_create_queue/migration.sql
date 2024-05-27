/*
  Warnings:

  - You are about to drop the column `avatarUrl` on the `experts` table. All the data in the column will be lost.
  - You are about to drop the column `socialLinks` on the `experts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "experts" DROP COLUMN "avatarUrl",
DROP COLUMN "socialLinks";

-- CreateTable
CREATE TABLE "queues" (
    "id" TEXT NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expertId" TEXT NOT NULL,

    CONSTRAINT "queues_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "queues" ADD CONSTRAINT "queues_expertId_fkey" FOREIGN KEY ("expertId") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
