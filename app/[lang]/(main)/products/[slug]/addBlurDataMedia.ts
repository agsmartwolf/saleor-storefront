"use server";
import getBase64ImageUrl from "@/lib/generateBlurPlaceholder";
import { type ProductMedia } from "@/gql/graphql";
import { type MediaWithBlurData } from "@/ui/components/Carousel";

export async function addBlurDataMedia(media: ProductMedia[]) {
	const updatedMedia: MediaWithBlurData[] = [];
	if (media?.length && media?.length > 0) {
		const promises = media?.map((m) => getBase64ImageUrl(m));
		const blurDataList = await Promise.all(promises ?? []);
		blurDataList.forEach((data, ind) => {
			if (typeof media?.[ind] !== "undefined") {
				updatedMedia.push({
					...media[ind],
					blurDataURL: data,
				});
			}
		});
	}
	return updatedMedia;
}
