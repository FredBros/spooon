import { fetchTikTokVideoDetails } from '@/src/utils/tiktokUtils';
import React from 'react'


export default async function TikTok() {
  // Exemple d'utilisation
  const videoUrl =
    "https://www.tiktok.com/@samouricefrance/video/7333256094963256608?is_from_webapp=1&sender_device=pc"; // remplacer par l'URL de la vidéo TikTok
  fetchTikTokVideoDetails(videoUrl)
    .then((videoDetails) => {
      console.log("Détails de la vidéo TikTok :", videoDetails);
    })
    .catch((error) => {
      console.error("Erreur :", error);
    });
  return <div>tiktok</div>;
}
