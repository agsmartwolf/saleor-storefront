"use client";

import { useEffect, useMemo } from "react";
import { isNull } from "lodash-es";
import { useSearchParams } from "next/navigation";
import { type ImageProps } from "next/image";
import {
	type AttributeOptionsVarSelectorType,
	getPrimaryAttribute,
	mapSaleorProductMediaToCarousal,
} from "../../../app/lib/products";
import { type Product } from "../../../gql/graphql";
import { Carousel, type MediaWithBlurData } from "../Carousel";
import { ImageExpand } from "./ImageExpand";
import { VideoExpand } from "./VideoExpand";
import { useCarouselState } from "../Carousel/useCarouselState";

export interface ProductGalleryProps {
	// product: ProductDetailsFragment;
	product: Product;
	attributeOptions: AttributeOptionsVarSelectorType;
}

export function ProductGallery({ product, attributeOptions }: ProductGalleryProps) {
	const query = useSearchParams();
	const primaryAttribute = useMemo(() => getPrimaryAttribute(attributeOptions), []);
	const selectedPrimaryAttrValue = useMemo(
		() => (primaryAttribute?.attribute?.id ? query.get(primaryAttribute?.attribute?.id) : null),
		[primaryAttribute, query],
	);

	const galleryMedia =
		product.media
			?.filter((m) => !isNull(m))
			.map((m) => mapSaleorProductMediaToCarousal(m as MediaWithBlurData)) ?? [];

	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	let initialImageIndex = getImgIndexOnPrimaryAttr({
		product,
		selectedPrimaryAttrValue,
		galleryMedia,
	});

	initialImageIndex = initialImageIndex === -1 ? 0 : initialImageIndex;

	const {
		setCurrentImageCB,
		direction,
		expandedImage,
		videoToPlay,
		currentImgIndex,
		currentImage,
		setExpandedImage,
		setVideoToPlay,
	} = useCarouselState({
		initialImage: galleryMedia?.[initialImageIndex],
		initialImageIndex,
		media: galleryMedia,
	});

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		const ind = getImgIndexOnPrimaryAttr({
			product,
			selectedPrimaryAttrValue,
			galleryMedia,
		});
		if (ind !== -1) {
			setCurrentImageCB(ind);
		}
	}, [product, selectedPrimaryAttrValue]);

	return (
		<>
			{expandedImage && (
				<div className="min-w-screen absolute bottom-0 left-0 right-0 top-0 z-40 h-full min-h-screen w-full">
					<ImageExpand image={expandedImage} onRemoveExpand={() => setExpandedImage(undefined)} />
				</div>
			)}

			{videoToPlay && (
				<div className="min-w-screen absolute bottom-0 left-0 right-0 top-0 z-40 min-h-screen">
					<VideoExpand video={videoToPlay} onRemoveExpand={() => setVideoToPlay(undefined)} />
				</div>
			)}
			<Carousel
				currentImg={currentImage}
				currentImgIndex={currentImgIndex}
				setCurrentImage={setCurrentImageCB}
				setVideoToPlay={setVideoToPlay}
				media={galleryMedia}
				direction={direction}
			/>
		</>
	);
}

function getImgIndexOnPrimaryAttr({
	product,
	selectedPrimaryAttrValue,
	galleryMedia,
}: {
	galleryMedia: (ImageProps & MediaWithBlurData)[];
	selectedPrimaryAttrValue: string | null;
	product: Product;
}) {
	const curVar = product.variants?.find((_var) =>
		_var.attributes.some((a) => a.values.some((v) => v.id === selectedPrimaryAttrValue)),
	);
	if (curVar && curVar?.media?.[0]) {
		const ind = galleryMedia.findIndex((m) => m.url === curVar?.media?.[0]?.url);
		return ind;
	}
	return -1;
}

export default ProductGallery;
