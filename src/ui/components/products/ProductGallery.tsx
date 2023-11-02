"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useKeypress from "react-use-keypress";
import { isNull } from "lodash-es";
import { useSearchParams } from "next/navigation";
import { type AttributeOptionsVarSelectorType, getPrimaryAttribute } from "@/app/lib/products";
import { type Product, type ProductMedia } from "@/gql/graphql";
import { Carousel, type MediaWithBlurData } from "@/ui/components/Carousel";
import { ImageExpand } from "@/ui/components/products/ImageExpand";
import { VideoExpand } from "@/ui/components/products/VideoExpand";

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

	const [expandedImage, setExpandedImage] = useState<MediaWithBlurData | undefined>(undefined);
	const [videoToPlay, setVideoToPlay] = useState<MediaWithBlurData | undefined>(undefined);

	const galleryMedia = product.media?.filter((m) => !isNull(m)) ?? [];

	let initialImageIndex = getImgIndexOnPrimaryAttr({
		product,
		selectedPrimaryAttrValue,
		galleryMedia,
	});

	initialImageIndex = initialImageIndex === -1 ? 0 : initialImageIndex;

	const [currentImage, setCurrentImage] = useState<MediaWithBlurData | ProductMedia>(
		galleryMedia?.[initialImageIndex],
	);
	const [direction, setDirection] = useState(0);
	const [currentImgIndex, setCurrentImageInd] = useState(initialImageIndex);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	useKeypress("Escape", () => {
		setExpandedImage(undefined);
	});

	const setCurrentImageCB = useCallback(
		(ind: number) => {
			if (ind > currentImgIndex) {
				setDirection(1);
			} else {
				setDirection(-1);
			}
			setCurrentImage(galleryMedia[ind]);
			setCurrentImageInd(ind);
		},
		[currentImage, galleryMedia, setCurrentImage],
	);

	useEffect(() => {
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
	galleryMedia: ProductMedia[];
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
