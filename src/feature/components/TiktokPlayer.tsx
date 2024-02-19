import { TikTokEmbed } from "react-social-media-embed";

export default function TiktokPlayer(url: string) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <TikTokEmbed
        url={url}
        width={325}
      />
    </div>
  );
}