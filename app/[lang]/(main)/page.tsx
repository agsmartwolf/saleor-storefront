import { type ReactNode } from "react";
import { Box, Heading } from "@kuma-ui/core";
import Image from "next/image";
import getIntl from "../intl";
import { type LanguageCodeEnum, ProductListByCollectionDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { FullWidthPicture } from "@/ui/components/FullWidthPicture";
import { ProductElement } from "@/ui/components/ProductElement";
export const metadata = {
	title: "Smart Wolf",
	description:
		"Welcome to our online store for dog lovers! We offer a wide range of high-quality products, clothes and equipment for your furry friends.",
};

export default async function Page({ params: { lang } }: { params: { lang: string } }) {
	const data = await executeGraphQL(ProductListByCollectionDocument, {
		variables: {
			slug: "bestsellers",
			locale: lang.toUpperCase() as LanguageCodeEnum,
		},
		revalidate: 60,
	});
	const intl = await getIntl(lang, "home");
	const heroItems = HERO_IMAGES.map((item, ind) => ({
		...item,
		title: intl.formatMessage({
			id: `hero.title.${ind.toString()}`,
		}),
		link: intl.formatMessage({
			id: "hero.button",
		}),
	}));

	const bestsellers = data.collection?.products?.edges.splice(0, 3).map((e) => e.node);

	return (
		<div>
			<section className="mx-auto">
				<Box className="flex flex-col items-center bg-[black]">
					<Box
						className="relative w-full max-w-7xl"
						overflow="hidden"
						height={[heroItems[0].mobile.height, heroItems[0].desktop.height]}
						maxHeight={"calc(100vh - 64px)"}
					>
						<HeroImages items={heroItems} />
					</Box>
				</Box>

				<Box className="mx-auto flex max-w-7xl flex-col items-center overflow-hidden px-0 py-14 sm:px-8 sm:py-24 md:overflow-visible">
					<Heading
						as={"h1"}
						fontWeight="600"
						className="color-black-100 relative mx-auto mb-16 inline-block text-[30px] sm:text-[40px]"
					>
						<Image
							className="absolute -left-1/4 -top-1/2 z-[-1]"
							src="/images/landing/quotes.svg"
							width={119}
							height={124}
							alt={"bestseller header quotes"}
						/>
						{intl.formatMessage({ id: "bestsellers" })}
					</Heading>
					<Box
						className="relative flex w-full gap-4 overflow-x-auto py-6 sm:gap-12 md:overflow-visible"
						listStyleType="none"
					>
						{bestsellers?.map((p, ind) => (
							<Box key={p.id} className="" transform={["", ind === 1 ? "scale(1.1)" : ""]}>
								<ProductElement product={p} loading={"eager"} vertical />
							</Box>
						))}
						<Box
							className="bg-white/30 backdrop-blur-sm"
							display={["inline-block", "none"]}
							position="fixed"
							width={40}
							right={-12}
							height="calc(100% - 32px)"
						/>
					</Box>
				</Box>
			</section>
		</div>
	);
}

function HeroImages({
	items,
}: {
	items: ((typeof HERO_IMAGES)[0] & { title: string; link: string })[];
}): ReactNode[] {
	return items.map((item, ind) => (
		<Box
			position={"absolute"}
			key={item.desktop.src + item.mobile.src}
			className="left-0 top-0 animate-fade"
			animationDelay={`${5 * ind}s`}
		>
			<FullWidthPicture {...item} />
		</Box>
	));
}

const HERO_IMAGES = [
	{
		mobile: {
			src: "/images/landing/mobile/hero/1.jpg",
			alt: "",
			width: 390,
			height: 723,
			style: { width: "100vw", height: "auto" },
		},
		desktop: {
			src: "/images/landing/desktop/hero/1.jpg",
			alt: "",
			width: 1439,
			height: 937,
			style: { width: "100vw", height: "auto" },
		},
	},
	{
		mobile: {
			src: "/images/landing/mobile/hero/2.jpg",
			alt: "",
			width: 390,
			height: 723,
			style: { width: "100vw", height: "auto" },
		},
		desktop: {
			src: "/images/landing/desktop/hero/2.jpg",
			alt: "",
			width: 1439,
			height: 937,
			style: { width: "100vw", height: "auto" },
		},
	},
	{
		mobile: {
			src: "/images/landing/mobile/hero/3.jpg",
			alt: "",
			width: 390,
			height: 723,
			style: { width: "100vw", height: "auto" },
		},
		desktop: {
			src: "/images/landing/desktop/hero/3.jpg",
			alt: "",
			width: 1439,
			height: 937,
			style: { width: "100vw", height: "auto" },
		},
	},
];
