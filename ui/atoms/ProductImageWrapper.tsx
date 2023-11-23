import { type ImageProps } from "next/image";
import { FallbackImage } from "@/ui/atoms/FallbackImage";

export const ProductImageWrapper = (props: ImageProps) => {
	return (
		<div className="aspect-square overflow-hidden">
			<FallbackImage {...props} className="h-full w-full object-contain object-center p-2" />
		</div>
	);
};
