"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { type HERO_IMAGES } from "./constants";
import { FullWidthPicture } from "@/ui/components/FullWidthPicture";

export function HeroImages({
	items,
}: {
	items: ((typeof HERO_IMAGES)[0] & { title: string; link: string })[];
}): ReactNode {
	const [curImgInd, setCurImgInd] = useState(0);
	const intervalId = useRef<NodeJS.Timeout>();
	useEffect(() => {
		intervalId.current = setInterval(() => {
			if (curImgInd + 1 >= items.length) {
				setCurImgInd(0);
			} else {
				setCurImgInd(curImgInd + 1);
			}
		}, 3000);
		return () => {
			clearInterval(intervalId.current);
		};
	}, [curImgInd, items]);

	return (
		<AnimatePresence>
			<motion.div
				key={items[curImgInd].desktop.src + items[curImgInd].mobile.src}
				className="absolute left-0 top-0"
				exit={{ opacity: 0 }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ animationDuration: 1 }}
			>
				<FullWidthPicture {...items[curImgInd]} />
			</motion.div>
		</AnimatePresence>
	);
}
