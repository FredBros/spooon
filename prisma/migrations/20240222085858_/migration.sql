/*
  Warnings:

  - You are about to drop the column `channelId` on the `Recipe` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_channelId_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "channelId";

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_ytChannelId_fkey" FOREIGN KEY ("ytChannelId") REFERENCES "Channel"("ytId") ON DELETE RESTRICT ON UPDATE CASCADE;
