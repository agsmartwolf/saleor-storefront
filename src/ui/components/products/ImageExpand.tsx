import Image from "next/image";
import React from "react";
import { type ProductMedia } from "@/gql/graphql";

interface ImageExpandProps {
	image?: ProductMedia;
	onRemoveExpand: () => void;
}
export function ImageExpand({ image, onRemoveExpand }: ImageExpandProps) {
	if (!image) {
		return null;
	}

	return (
		<div className="absolute mx-auto grid min-h-screen w-full grid-cols-1 overflow-hidden bg-gray-100 px-8 md:h-full">
			<button
				type="button"
				className="mt-18 absolute right-0 z-40 grid h-6 w-6 content-center justify-center p-8"
				aria-label="Close"
				onClick={onRemoveExpand}
			>
				{/* TODO */}
				{/*<XIcon className="w-6 h-6" />*/}
			</button>
			<div className="absolute h-full w-full md:mt-10">
				<Image src={image.url} alt={image.alt} layout="fill" objectFit="scale-down" />
			</div>
		</div>
	);
}
