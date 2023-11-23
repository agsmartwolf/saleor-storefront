import { unstable_getImgProps as getImgProps, type ImageProps } from "next/image";

const MOBILE_WIDTH = 639;

export type PictureProps = {
	className?: string;
	desktop: ImageProps & {
		src: string;
	};
	mobile: ImageProps & {
		src: string;
	};
};
export function Picture(props: PictureProps) {
	const common = { alt: "" };
	const {
		props: { srcSet: mobileSrcSet },
	} = getImgProps({
		...common,
		alt: props.mobile.alt,
		width: props.mobile.width,
		height: props.mobile.height,
		src: props.mobile.src,
	});
	const {
		props: { srcSet: desktopSrcSet, ...rest },
	} = getImgProps({
		...common,
		alt: props.desktop.alt,
		width: props.desktop.width,
		height: props.desktop.height,
		src: props.desktop.src,
	});

	return (
		<picture>
			<source
				className={props.className}
				media={`(min-width: ${MOBILE_WIDTH + 1}px)`}
				srcSet={desktopSrcSet}
			/>
			<source className={props.className} media={`(max-width: ${MOBILE_WIDTH}px)`} srcSet={mobileSrcSet} />
			<img {...rest} />
		</picture>
	);
}
