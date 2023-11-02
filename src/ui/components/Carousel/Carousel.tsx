"use client";

import Image from "next/image";
import { animate, AnimatePresence, motion, MotionConfig } from "framer-motion";
import React, { useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import ArrowRightIcon from "../../../public/arrow-right.svg";
import ArrowLeftIcon from "../../../public/arrow-left.svg";
import ProductMediaThumbnails from "./ProductMediaThumbnails";
import { animationVariants } from "@/ui/components/Carousel/utils";
import { type ProductMedia } from "@/gql/graphql";
import { useOnScreen } from "@/hooks/useOnScreen";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";

export type MediaWithBlurData = ProductMedia & {
	blurDataUrl: string;
};
export function Carousel({
	currentImg,
	currentImgIndex,
	setCurrentImage,
	setVideoToPlay,
	media = [],
	direction,
}: {
	currentImg: MediaWithBlurData;
	media: MediaWithBlurData[];
	currentImgIndex: number;
	direction: number;
	setCurrentImage: (ind: number) => void;
	setVideoToPlay: (v: MediaWithBlurData) => void;
}) {
	const [loaded, setLoaded] = useState(false);

	const currentImageRef = useRef(null);
	const isCurrentImgVisible = useOnScreen(currentImageRef);

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			if (currentImgIndex < media?.length - 1) {
				setCurrentImage(currentImgIndex + 1);
			}
		},
		onSwipedRight: () => {
			if (currentImgIndex > 0) {
				setCurrentImage(currentImgIndex - 1);
			}
		},
		trackMouse: true,
	});

	return (
		<MotionConfig
			transition={{
				x: { type: "spring", stiffness: 300, damping: 30 },
				opacity: { duration: 0.2 },
			}}
		>
			<div
				className="wide:h-full xl:taller-than-854:h-auto relative z-50 flex aspect-square w-full max-w-7xl items-center"
				{...handlers}
			>
				<div className="flex w-full">
					<div className="w-full overflow-hidden">
						<div className="relative flex aspect-square items-center justify-center" ref={currentImageRef}>
							{/* Buttons */}
							{loaded && (
								<>
									{currentImgIndex > 0 && (
										<button
											type="button"
											className="absolute left-3 top-[calc(50%-16px)] z-50 rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
											style={{ transform: "translate3d(0, 0, 0)" }}
											onClick={() => setCurrentImage(currentImgIndex - 1)}
										>
											<Image className="h-6 w-6" src={ArrowLeftIcon} alt={"Arrow right"} />
										</button>
									)}
									{currentImgIndex + 1 < media.length && (
										<button
											type="button"
											className="absolute right-3 top-[calc(50%-16px)] z-50 rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
											style={{ transform: "translate3d(0, 0, 0)" }}
											onClick={() => setCurrentImage(currentImgIndex + 1)}
										>
											<Image className="h-6 w-6" src={ArrowRightIcon} alt={"Arrow right"} />
										</button>
									)}
								</>
							)}
							<AnimatePresence initial={false} custom={direction}>
								<motion.div
									key={currentImgIndex}
									custom={direction}
									variants={animationVariants}
									initial="enter"
									animate="center"
									exit="exit"
									className="absolute"
								>
									{currentImg.type === "VIDEO" && (
										<div
											role="button"
											tabIndex={-2}
											onClick={() => {
												setVideoToPlay(currentImg);
											}}
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													setVideoToPlay(currentImg);
												}
											}}
										>
											{/* TODO */}
											{/*{videoThumbnailUrl && (*/}
											{/*  <Image*/}
											{/*    src={videoThumbnailUrl}*/}
											{/*    alt={currentImg.alt}*/}
											{/*    layout="fill"*/}
											{/*    objectFit="cover"*/}
											{/*  />*/}
											{/*)}*/}
											<div className="absolute flex h-full w-full transform items-center justify-center bg-transparent transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110">
												{/*
                        TODO
                        <PlayIcon className="h-12 w-12" />
                        */}
											</div>
										</div>
									)}
									{currentImg.type === "IMAGE" && (
										<Image
											width={1024}
											height={1024}
											src={currentImg?.url}
											placeholder="blur"
											blurDataURL={currentImg.blurDataUrl}
											priority
											alt="Next.js Conf image"
											onLoad={() => setLoaded(true)}
										/>
									)}
								</motion.div>
							</AnimatePresence>
						</div>
					</div>
					<ProductMediaThumbnails
						images={media}
						currentImageIndex={currentImgIndex}
						currentPhoto={currentImg}
						setCurrentImage={setCurrentImage}
						setVideoToPlay={setVideoToPlay}
						loaded={loaded}
						hide={!isCurrentImgVisible}
					/>
				</div>
			</div>
		</MotionConfig>
	);
}
