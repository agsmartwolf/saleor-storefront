"use client";
import { useEffect, useState } from "react";
import NextImage, { type ImageProps } from "next/image";

export const FallbackImage = ({ src, ...rest }: ImageProps) => {
	const [imgSrc, setImgSrc] = useState(src);

	useEffect(() => {
		setImgSrc(src);
	}, [src]);

	return (
		<NextImage
			{...rest}
			src={imgSrc ? imgSrc : "/images/fallback.svg"}
			onError={() => {
				setImgSrc("/images/fallback.svg");
			}}
		/>
	);
};
