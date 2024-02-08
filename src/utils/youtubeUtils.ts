import { google } from "googleapis";
import { env } from "../../lib/env";

const YOUTUBE_API_KEY= env.YOUTUBE_API_KEY;
const youtube = google.youtube({
  version: "v3",
  auth: YOUTUBE_API_KEY,
});

export const getVideoDetails = async (videoUrl:string) => {
  const videoIdMatch = videoUrl.match(/[?&]v=([^&]+)/);
  if (!videoIdMatch) {
    console.error("L'URL de la vidéo YouTube est invalide");
    return null;
  }
    const videoId = videoIdMatch[1];
    const response = await youtube.videos.list({
      id: [videoId],
      part: ["snippet"],
    });
  if (!response.data.items || !response.data.items[0].id) {
      throw new Error("No video found");
    }
    const video = response.data.items[0];
    if (!video.id) {throw new Error("No video found")}
    return {
      ytId: video.id,
      ytDescription: video.snippet?.description || "Pas de description disponible",
      ytChannelId: video.snippet?.channelId,
      ytChannelTitle: video.snippet?.channelTitle,
      ytThumbail: video.snippet?.thumbnails?.default?.url,
      ytPublishedAt: video.snippet?.publishedAt,
    };
};