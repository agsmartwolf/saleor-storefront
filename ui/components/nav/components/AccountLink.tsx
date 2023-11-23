import React from "react";
import Link from "next/link";
import { UserIcon } from "lucide-react";

export function AccountLink() {
	return (
		<Link href="/login" className="h-6 w-6 flex-shrink-0 ">
			<UserIcon className="h-6 w-6 shrink-0 text-white" aria-hidden="true" />
			<span className="sr-only text-white">Log in</span>
		</Link>
	);
}
