"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({ href, children }: { href: string; children: JSX.Element | string }) {
	const pathname = usePathname();

	const isActive = pathname === href;

	return (
		<li className="inline-flex">
			<Link
				href={href}
				className={clsx(
					isActive ? "border-neutral-900 text-green-100 underline underline-offset-8" : "border-transparent",
					"inline-flex items-center border-b-2 pt-px text-xs font-[400] hover:text-green-100",
				)}
			>
				{children}
			</Link>
		</li>
	);
}
