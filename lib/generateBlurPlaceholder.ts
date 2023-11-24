"use server";

import Jimp from "jimp";
import sharp from "sharp";
import { type ProductMedia } from "@/gql/graphql";
import { DEFAULT_IMAGE_PLACEHOLDER_BASE_64 } from "@/lib/constants";

const cache = new Map<string, string>();

const SUPPORTED_MIME_TYPES = [
	"image/gif",
	"image/jpg",
	"image/jpeg",
	"image/png",
	"image/svg+xml",
	"image/webp",
	"image/gif",
];

export default async function getBase64ImageUrl(image: ProductMedia): Promise<string> {
	let url = cache.get(image.url);
	if (url) {
		return url;
	}

	const response = await fetch(image.url);
	const buffer = await response.arrayBuffer();
	let buf = Buffer.from(buffer);
	const mimeType = response.headers.get("Content-Type");
	if (!SUPPORTED_MIME_TYPES.includes(mimeType)) {
		return DEFAULT_IMAGE_PLACEHOLDER_BASE_64;
	}

	if (mimeType && !!/webp/gi.exec(mimeType)) {
		buf = await sharp(buffer).toFormat("jpeg").toBuffer();
	}
	const im = await Jimp.read(buf);
	url = await im.resize(Jimp.AUTO, 400).quality(5).blur(5).getBase64Async(Jimp.MIME_JPEG);

	// url = `data:image/jpeg;base64,${Buffer.from(minified).toString("base64")}`;
	cache.set(image.url, url);
	return url;
}
