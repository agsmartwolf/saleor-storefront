"use client";

import { type ReactNode, useCallback, useState } from "react";
import useKeypress from "react-use-keypress";

export function useCarouselState<T>({
	initialImage,
	initialImageIndex,
	media,
}: {
	initialImage: T;
	initialImageIndex: number;
	media?: T[];
}) {
	const [currentImage, setCurrentImage] = useState<T | ReactNode>(initialImage);
	const [direction, setDirection] = useState(0);
	const [currentImgIndex, setCurrentImageInd] = useState(initialImageIndex);

	// opt
	const [expandedImage, setExpandedImage] = useState<T | undefined>(undefined);
	const [videoToPlay, setVideoToPlay] = useState<T | undefined>(undefined);

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
			if (media) {
				setCurrentImage(media[ind]);
			}
			setCurrentImageInd(ind);
		},
		[currentImage, media, setCurrentImage],
	);

	return {
		setCurrentImageCB,
		direction,
		expandedImage,
		videoToPlay,
		currentImgIndex,
		currentImage,
		setExpandedImage,
		setVideoToPlay,
	};
}
