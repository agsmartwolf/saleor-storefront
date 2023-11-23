import { Suspense } from "react";
import { Sora } from "next/font/google";
import { Box } from "@kuma-ui/core";
import { AccountLink } from "./components/AccountLink";
import { CartNavItem } from "./components/CartNavItem";
import { NavLinks } from "./components/NavLinks";
import { MobileMenu } from "./components/MobileMenu";

const sora = Sora({ subsets: ["latin"] });

export const Nav = () => {
	return (
		<Box
			as="nav"
			display="flex"
			className={`${sora.className} w-full gap-4 lg:gap-8`}
			aria-label="Main navigation"
		>
			<ul className="ml-auto hidden gap-4 overflow-x-auto whitespace-nowrap text-white md:flex lg:gap-8 lg:px-0">
				<NavLinks />
			</ul>
			<div className="ml-auto flex items-center justify-center whitespace-nowrap">
				<AccountLink />
			</div>
			<div className="flex items-center">
				<Suspense fallback={<div className="w-6" />}>
					<CartNavItem />
				</Suspense>
			</div>
			<Suspense>
				<MobileMenu>
					<NavLinks />
				</MobileMenu>
			</Suspense>
		</Box>
	);
};
