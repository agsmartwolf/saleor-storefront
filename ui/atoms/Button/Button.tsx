import React from "react";
import Link from "next/link";
import cn from "clsx";
import Bone from "./bone.svg";

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum BUTTON_TYPE {
	BUTTON = "button",
	LINK = "link",
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum BUTTON_STYLE {
	PRIMARY = "button_primary",
	SECONDARY = "button_secondary",
	ANCHOR = "button_anchor",
	DANGER = "danger",
}

interface BaseProps {
	/**
	 * Does the button have a border?
	 */
	hasBorder?: boolean;
	/**
	 * Does the button have shadow?
	 */
	hasShadow?: boolean;
	/**
	 * Should the small variation of the button be used?
	 */
	small?: boolean;
	/**
	 * Should the full width variation of the button be used?
	 */
	fullWidth?: boolean;
	/**
	 * Is the button disabled?
	 */
	disabled?: boolean;
	loading?: boolean;

	/**
	 * Does the button function as a link?
	 */
	elType: BUTTON_TYPE;
	/**
	 * The style of the button
	 */
	buttonStyle?: BUTTON_STYLE;
}

type ButtonTypeProps = BaseProps &
	React.ButtonHTMLAttributes<HTMLButtonElement> & {
		elType: BUTTON_TYPE.BUTTON;
	};

type LinkTypeProps = BaseProps &
	React.AnchorHTMLAttributes<HTMLAnchorElement> & {
		elType: BUTTON_TYPE.LINK;
		href: string;
	};

export type ButtonProps = ButtonTypeProps | LinkTypeProps;

/**
 * Primary UI component for user interaction
 */
const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
	(
		{
			children,
			hasBorder = true,
			hasShadow = false,
			loading = false,
			small = false,
			fullWidth = false,
			disabled = false,
			elType = BUTTON_TYPE.BUTTON,
			buttonStyle = BUTTON_STYLE.PRIMARY,
			...props
		},
		ref,
	) => {
		const classNames = cn(
			"inline-block border text-md text-center font-bold first-letter:uppercase all-ease-in-out-400",
			"disabled:pointer-events-none disabled:select-none",
			buttonStyle === BUTTON_STYLE.PRIMARY && [
				"text-button-white bg-button-black",
				"hover:bg-green-200 hover:text-button-black hover:border-green-200",
				"active:bg-green-300 active:text-button-black",
				"disabled:bg-disabled disabled:border-disabled",
			],
			buttonStyle === BUTTON_STYLE.SECONDARY && [
				"text-button-black bg-green-100 border-green-100",
				"hover:bg-green-300 hover:border-green-300",
				"active:bg-green-200 active:text-button-black",
				"disabled:bg-button-white disabled:border-disabled disabled:text-disabled",
			],
			buttonStyle === BUTTON_STYLE.DANGER && [
				"text-button-white bg-error-dark",
				"hover:bg-transparent hover:text-error-dark",
				"active:bg-error-light hover:text-error-dark",
				"disabled:bg-disabled disabled:border-disabled",
			],
			{
				"py-4 px-16": !small,
				"py-2 px-10": small,
				"py-4 px-2 w-full": fullWidth,
				"border-button-white": hasBorder && buttonStyle === BUTTON_STYLE.PRIMARY,
				"border-green-100": hasBorder && buttonStyle === BUTTON_STYLE.SECONDARY,
				"border-error-dark": hasBorder && buttonStyle === BUTTON_STYLE.DANGER,
				"border-transparent": !hasBorder,
				"shadow-2xl": hasShadow,
			},
			props.className,
		);

		return elType === BUTTON_TYPE.LINK && !disabled ? (
			<Link
				{...(props as LinkTypeProps)}
				href={(props as LinkTypeProps).href ?? ""}
				ref={ref as React.ForwardedRef<HTMLAnchorElement>}
				className={classNames}
			>
				{children}
			</Link>
		) : (
			<button
				{...(props as ButtonTypeProps)}
				className={classNames}
				ref={ref as React.ForwardedRef<HTMLButtonElement>}
				disabled={disabled || loading}
			>
				<div className="flex items-center justify-center">
					{loading ? <Bone className="mr-2 w-4 animate-spin" /> : null}
					{children}
				</div>
			</button>
		);
	},
);

Button.displayName = "Button";

export default Button;
