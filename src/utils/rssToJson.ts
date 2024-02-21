import { parse } from "rss-to-json";

export async function rssToJson (rssUrl:string){
  const jsonData = await parse(rssUrl);

  return jsonData;
}
