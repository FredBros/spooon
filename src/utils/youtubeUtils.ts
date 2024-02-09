import { google } from "googleapis";
import { env } from "../../lib/env";

const YOUTUBE_API_KEY = env.YOUTUBE_API_KEY;
const youtube = google.youtube({
  version: "v3",
  auth: YOUTUBE_API_KEY,
});

const getChannelthumbnail = async (channelId?: string | null) => {
  if (!channelId) {
    return null;
  }
  const channelList = await youtube.channels.list({
    id: [channelId],
    part: ["snippet"],
  });
  if (!channelList.data.items) {
    return null;
  }
  return channelList.data.items[0].snippet?.thumbnails?.default?.url;
};

export const getVideoDetails = async (videoUrl: string) => {
  const videoIdMatch = videoUrl.match(/[?&]v=([^&]+)/);
  if (!videoIdMatch) {
    console.error("L'URL de la vidéo YouTube est invalide");
    return null;
  }
  const videoId = videoIdMatch[1];
  const videoList = await youtube.videos.list({
    id: [videoId],
    part: ["snippet"],
  });
  if (!videoList.data.items || !videoList.data.items[0].id) {
    throw new Error("No video found");
  }
  const video = videoList.data.items[0];
  if (!video.id) {
    throw new Error("No video found");
  }
  const channelId = video.snippet?.channelId;

  const ytChannelthumbnail = await getChannelthumbnail(channelId);

  return {
    ytId: video.id,
    ytDescription:
      video.snippet?.description || "Pas de description disponible",
    ytChannelId: video.snippet?.channelId,
    ytChannelTitle: video.snippet?.channelTitle,
    ytThumbnail: video.snippet?.thumbnails?.standard?.url,
    ytPublishedAt: video.snippet?.publishedAt,
    title: video.snippet?.title || "Pas de titre disponible",
    ytChannelThumbnail: ytChannelthumbnail,
  };
};
