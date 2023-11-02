import dynamic from "next/dynamic";
import { HStack, Box } from "@kuma-ui/core";
import { Skeleton } from "@/ui/atoms/Skeleton";

export const GenericAttribute = dynamic(
	() => import("./GenericAttribute").then((m) => ({ default: m.GenericAttribute })),
	{
		ssr: false,
		loading: () => (
			<HStack gap={8} py="2%" display={"flex"}>
				{new Array(10).fill(null).map((_, ind) => (
					<Box key={"skeleton_color_option" + ind} className="relative" display="inline-flex">
						<Skeleton className="h-[47.5px] w-[46px] min-w-[45px] animate-pulse" />
						<Skeleton className="absolute left-[2.5px] top-[2.5px] h-[40px] w-[40px] animate-pulse bg-gray-400" />
					</Box>
				))}
			</HStack>
		),
	},
);
