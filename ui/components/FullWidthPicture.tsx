import { Picture, type PictureProps } from "../atoms/Picture";
import Button from "@/ui/atoms/Button";
import { BUTTON_STYLE, BUTTON_TYPE } from "@/ui/atoms/Button/Button";

export interface FullWidthPictureProps extends PictureProps {
	title: string;
	link: string;
}
export function FullWidthPicture(props: FullWidthPictureProps) {
	return (
		<div>
			<div
				className={`absolute flex h-[calc(100%-120px)] max-w-7xl flex-col justify-between px-3 pt-8 sm:h-full sm:px-8 md:justify-center`}
			>
				<h1
					className={
						"z-10 mb-12 max-w-[300px] text-5xl font-extrabold uppercase text-green-100 sm:max-w-[unset] sm:whitespace-pre-line sm:font-semibold md:text-[80px] lg:text-7xl"
					}
				>
					{props.title}
				</h1>
				<Button
					className={"max-w-max text-sm font-medium sm:relative sm:font-semibold"}
					href={"/products"}
					buttonStyle={BUTTON_STYLE.SECONDARY}
					elType={BUTTON_TYPE.LINK}
				>
					{props.link}
				</Button>
			</div>
			<Picture {...props} />
		</div>
	);
}
