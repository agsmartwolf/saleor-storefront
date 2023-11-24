import { Box, Heading } from "@kuma-ui/core";
import { Picture, type PictureProps } from "../atoms/Picture";
import Button from "@/ui/atoms/Button";
import { BUTTON_STYLE, BUTTON_TYPE } from "@/ui/atoms/Button/Button";

export interface FullWidthPictureProps extends PictureProps {
	title: string;
	link: string;
}
export function FullWidthPicture(props: FullWidthPictureProps) {
	return (
		<Box>
			<Box
				display="flex"
				justifyContent={["space-between", "center"]}
				className={`h-[calc(100%-120px)] max-w-7xl flex-col px-3 pt-8 sm:h-full sm:px-8`}
				position="absolute"
			>
				<Heading
					className={
						"z-10 mb-12 max-w-[300px] text-5xl font-extrabold uppercase text-green-100 sm:max-w-[unset] sm:whitespace-pre-line sm:font-semibold md:text-[80px] lg:text-7xl"
					}
					textTransform={"uppercase"}
				>
					{props.title}
				</Heading>
				<Button
					className={"max-w-max text-sm font-medium sm:relative sm:font-semibold"}
					href={"/products"}
					buttonStyle={BUTTON_STYLE.SECONDARY}
					elType={BUTTON_TYPE.LINK}
				>
					{props.link}
				</Button>
			</Box>
			<Picture {...props} />
		</Box>
	);
}
