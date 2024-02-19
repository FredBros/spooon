"use server";
import TikTokScraper from "tiktok-scraper";

export async function fetchTikTokVideoDetails(videoUrl: string) {
  try {
    const videoId = videoUrl.split("/").pop(); // Obtenir l'ID de la vidéo à partir de l'URL
    if (!videoId) {
      console.error("L'URL de la vidéo TikTok est invalide");
      return null;
    }
    const videoDetails = await TikTokScraper.getVideoMeta(videoId);
    return videoDetails;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de la vidéo TikTok :",
      error
    );
    return null;
  }
}
