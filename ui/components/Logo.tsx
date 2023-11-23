"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Heading } from "@kuma-ui/core";

const companyName = "Smart Wolf";

export const Logo = ({ className }: { className?: string }) => {
	const pathname = usePathname();

	if (pathname === "/") {
		return (
			<Heading
				className={className}
				as="h1"
				display="flex"
				alignItems="center"
				fontWeight="bold"
				textTransform="lowercase"
				color="white"
				aria-label="homepage"
			>
				{companyName}
			</Heading>
		);
	}
	return (
		<Box
			display="flex"
			alignItems="center"
			fontWeight="bold"
			color="white"
			fontSize="1.4rem"
			textTransform="lowercase"
			className={className}
		>
			<Link aria-label="homepage" href="/">
				{companyName}
			</Link>
		</Box>
	);
};
