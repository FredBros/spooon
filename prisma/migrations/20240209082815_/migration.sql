-- CreateTable
CREATE TABLE "LikeChannel" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LikeChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "ytDescription" TEXT NOT NULL,
    "ytId" TEXT NOT NULL,
    "ytChannelId" TEXT,
    "ytChannelTitle" TEXT,
    "ytChannelThumbnail" TEXT,
    "userId" TEXT NOT NULL,
    "rate" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Channel_url_key" ON "Channel"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_ytId_key" ON "Channel"("ytId");

-- AddForeignKey
ALTER TABLE "LikeChannel" ADD CONSTRAINT "LikeChannel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeChannel" ADD CONSTRAINT "LikeChannel_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
