import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import { ProductMediaFragment } from "@/saleor/api";

const cache = new Map<string, string>();

export default async function getBase64ImageUrl(image: ProductMediaFragment): Promise<string> {
  let url = cache.get(image.url);
  if (url) {
    return url;
  }
  const response = await fetch(image.url);
  const buffer = await response.arrayBuffer();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const minified = await imagemin.buffer(Buffer.from(buffer), {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    plugins: [imageminJpegtran()],
  });

  url = `data:image/jpeg;base64,${Buffer.from(minified).toString("base64")}`;
  cache.set(image.url, url);
  return url;
}
