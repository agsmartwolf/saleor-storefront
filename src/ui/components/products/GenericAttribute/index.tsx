import dynamic from "next/dynamic";
import { HStack, Box } from "@kuma-ui/core";
import { Skeleton } from "@/ui/atoms/Skeleton";

export const GenericAttribute = dynamic(
  () => import('./GenericAttribute').then(m=>({"default":m.GenericAttribute})),
  {
    ssr: false,
    loading: () => (
      <HStack gap={8} py='2%' display={'flex'}>
        {
          new Array(10).fill(null).map((_, ind) =>
            <Box
              key={'skeleton_color_option' + ind}
              className="relative"
              display='inline-flex'
            >
            <Skeleton className="w-[46px] h-[47.5px] min-w-[45px] animate-pulse" />
            <Skeleton className="absolute w-[40px] h-[40px] top-[2.5px] left-[2.5px] animate-pulse bg-gray-400" />
        </Box>
          )
        }
      </HStack>
    )
  })