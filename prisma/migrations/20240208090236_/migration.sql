/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ytId]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_url_key" ON "Recipe"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_ytId_key" ON "Recipe"("ytId");
