import Image from "next/image";
import clsx from "clsx";
import getIntl from "../../intl";
import { HeroImages } from "./HeroImages";
import { type LanguageCodeEnum, ProductListByCollectionDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { ProductElement } from "@/ui/components/ProductElement";
import { REVALIDATE_TIME } from "@/lib/constants";
import { HERO_IMAGES } from "./constants";

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
		revalidate: REVALIDATE_TIME,
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
	// const smH = `h-${heroItems[0].mobile.height}`;
	// const mdH = `md:h-[${heroItems[0].desktop.height}px]`;
	return (
		<div>
			<section className="mx-auto">
				<div className="flex flex-col items-center bg-[black]">
					<div className={clsx(`relative h-[calc(100vh-64px)] w-full max-w-7xl overflow-hidden`)}>
						<HeroImages items={heroItems} />
					</div>
				</div>

				<div className="mx-auto flex max-w-7xl flex-col items-center overflow-hidden px-0 py-14 sm:px-8 sm:py-24 md:overflow-visible">
					<h1 className="color-black-100 relative mx-auto mb-16 inline-block text-[30px] font-[600] sm:text-[40px]">
						<Image
							className="absolute -left-1/4 -top-1/2 z-[-1]"
							src="/images/landing/quotes.svg"
							width={119}
							height={124}
							alt={"bestseller header quotes"}
						/>
						{intl.formatMessage({ id: "bestsellers" })}
					</h1>
					<div className="relative flex w-full list-none gap-4 overflow-x-auto py-6 sm:gap-12 md:overflow-visible">
						{bestsellers?.map((p, ind) => (
							<div key={p.id} className={clsx({ "md:scale-110": ind === 1 })}>
								<ProductElement product={p} loading={"eager"} vertical />
							</div>
						))}
						<div
							className={clsx(
								"bg-white/30 backdrop-blur-sm",
								"inline-block",
								"fixed -right-[12] w-[40] md:hidden",
								"h-[calc(100% - 32px)]",
							)}
						/>
					</div>
				</div>
			</section>
		</div>
	);
}
