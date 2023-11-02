import React from "react";

import { getYouTubeIDFromURL } from "@/lib/media";
import { type ProductMedia } from "@/gql/graphql";

interface VideoExpandProps {
	video?: ProductMedia;
	onRemoveExpand: () => void;
}

export function VideoExpand({ video, onRemoveExpand }: VideoExpandProps) {
	if (!video) {
		return null;
	}

	const videoId = getYouTubeIDFromURL(video.url);

	if (!videoId) {
		return null;
	}

	return (
		<div className="absolute mx-auto grid min-h-screen w-full grid-cols-1 bg-gray-100 px-8 md:h-full">
			<div
				role="button"
				tabIndex={0}
				className="absolute z-40 mx-auto grid h-6 w-full justify-end p-8 lg:px-8"
				onClick={() => onRemoveExpand()}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						onRemoveExpand();
					}
				}}
			>
				{/*TODO*/}
				{/*<XIcon className="w-6 h-6" />*/}
			</div>
			<div className="absolute flex h-full w-full items-center justify-center md:mt-10">
				<iframe
					title={video.alt || "Video"}
					src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
					className="h-4/5 w-full md:w-4/5"
					allow="autoplay"
					allowFullScreen
				/>
			</div>
		</div>
	);
}
