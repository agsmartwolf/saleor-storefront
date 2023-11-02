import { type RefObject, useEffect, useMemo, useState } from "react";

export function useOnScreen(ref: RefObject<HTMLElement>) {
	const [isIntersecting, setIntersecting] = useState(false);

	const observer = useMemo(
		() =>
			typeof window === "undefined"
				? null
				: new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting)),
		[ref],
	);

	useEffect(() => {
		observer?.observe(ref.current as Element);
		return () => observer?.disconnect();
	}, []);

	return isIntersecting;
}
