"use server";

import Jimp from "jimp";
import { type ProductMedia } from "@/gql/graphql";

const cache = new Map<string, string>();

export default async function getBase64ImageUrl(image: ProductMedia): Promise<string> {
  let url = cache.get(image.url);
  if (url) {
    return url;
  }
  const response = await fetch(image.url);
  const buffer = await response.arrayBuffer();
  const im = await Jimp.read(Buffer.from(buffer))
  url = await im.resize(Jimp.AUTO, 400).quality(5).blur(5).getBase64Async(Jimp.MIME_JPEG)

  // url = `data:image/jpeg;base64,${Buffer.from(minified).toString("base64")}`;
  cache.set(image.url, url);
  return url;
}
