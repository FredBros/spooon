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
  if (!response.data.items) {
      throw new Error("No video found");
    }
    const video = response.data.items[0];
    return {
      id: video.id,
      description: video.snippet?.description || "Pas de description disponible",
      channelId: video.snippet?.channelId,
      channelTitle: video.snippet?.channelTitle,
      thunmbail: video.snippet?.thumbnails?.default?.url,
      publishedAt: video.snippet?.publishedAt,
    };
};