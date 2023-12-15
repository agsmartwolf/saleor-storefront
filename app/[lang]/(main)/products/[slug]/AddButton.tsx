"use client";

import { useFormStatus } from "react-dom";
import { Box } from "@kuma-ui/core";

export function AddButton({
	disabled,
	price,
	content,
}: {
	disabled?: boolean;
	price?: string | null;
	content: {
		processing: string;
		addToBasket: string;
	};
}) {
	const { pending } = useFormStatus();
	const isButtonDisabled = disabled || pending;

	return (
		<button
			type="submit"
			aria-disabled={isButtonDisabled}
			onClick={(e) => isButtonDisabled && e.preventDefault()}
			className={`flex h-12 w-full items-center justify-between
			bg-green-100 px-6
			py-3 text-base font-medium leading-6 
			text-black-100 shadow hover:bg-green-200 
			disabled:cursor-not-allowed disabled:bg-gray-300 
			hover:disabled:opacity-70 aria-disabled:cursor-not-allowed 
			aria-disabled:opacity-70 
			hover:aria-disabled:bg-gray-300 sm:w-auto`}
		>
			{pending ? (
				<div className="inline-flex items-center">
					<svg
						className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					<span>{content.processing}</span>
				</div>
			) : (
				<>
					<span>{content.addToBasket}</span>
					<Box as="span" paddingLeft={["", "", "3rem"]}>
						{price}
					</Box>
				</>
			)}
		</button>
	);
}
