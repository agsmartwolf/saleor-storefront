import clsx from "clsx";
import Link from "next/link";

export async function Pagination({
	pageInfo,
}: {
	pageInfo: {
		endCursor?: string | null;
		startCursor?: string | null;
		hasNextPage: boolean;
		hasPreviousPage: boolean;
	};
}) {
	return (
		<nav className="flex items-center justify-center gap-x-4 border-neutral-200 px-4 pt-12">
			<Link
				href={pageInfo.hasPreviousPage ? `/products?startCursor=${pageInfo.startCursor}` : "#"}
				className={clsx("px-4 py-2 text-sm font-medium ", {
					"rounded bg-neutral-900 text-neutral-50 hover:bg-neutral-800": pageInfo.hasPreviousPage,
					"cursor-not-allowed rounded border text-neutral-400": !pageInfo.hasPreviousPage,
					"pointer-events-none": !pageInfo.hasPreviousPage,
				})}
				aria-disabled={!pageInfo.hasPreviousPage}
			>
				Previous page
			</Link>
			<Link
				href={pageInfo.hasNextPage ? `/products?endCursor=${pageInfo.endCursor}` : "#"}
				className={clsx("px-4 py-2 text-sm font-medium ", {
					"rounded bg-neutral-900 text-neutral-50 hover:bg-neutral-800": pageInfo.hasNextPage,
					"cursor-not-allowed rounded border text-neutral-400": !pageInfo.hasNextPage,
					"pointer-events-none": !pageInfo.hasNextPage,
				})}
				aria-disabled={!pageInfo.hasNextPage}
			>
				Next page
			</Link>
		</nav>
	);
}
