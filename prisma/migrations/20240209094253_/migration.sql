/*
  Warnings:

  - You are about to drop the column `rate` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "rate",
ADD COLUMN     "rating" DOUBLE PRECISION;
