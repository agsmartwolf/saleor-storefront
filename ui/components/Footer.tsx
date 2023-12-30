import Link from "next/link";
import Image from "next/image";
import { Box } from "@kuma-ui/core";
import { Fragment } from "react";
import { MenuGetBySlugDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";

export async function Footer() {
	const footerLinks = await executeGraphQL(MenuGetBySlugDocument, {
		variables: { slug: "footer" },
		revalidate: 60 * 60 * 24,
	});

	return (
		<footer className="border-black-300 bg-black-100">
			<div className="mx-auto max-w-7xl px-4 lg:px-8">
				<Box display="flex" justifyContent={"space-between"} paddingTop={38} alignItems={"center"}>
					<Image src="/images/icons/smart-wolf.svg" alt={"smart wolf logo"} width={125} height={19} />
					<Box display="flex" gap={10}>
						<Link href="https://t.me/smart_wolf_ag" className="leading-none text-white">
							<Image
								src="/images/icons/telegram.svg"
								alt="telegram"
								height={20}
								width={20}
								className="h-auto w-8 hover:opacity-80"
							/>
						</Link>
						<Link href="https://www.instagram.com/smartwolf.store/" className="leading-none text-white">
							<Image
								src="/images/icons/instagram.svg"
								alt="instagram"
								height={20}
								width={20}
								className="h-auto w-8 hover:opacity-80"
							/>
						</Link>
					</Box>
				</Box>
				<hr className="mt-6 h-1 w-full" />

				<div className="grid grid-cols-1 gap-2 pt-4">
					{footerLinks.menu?.items?.map((item, ind) => {
						return (
							<Fragment key={item.id}>
								<div>
									{item.page?.slug && !footerLinks.menu?.items?.[ind - 1].page?.slug ? (
										<hr className="mb-4 h-1 w-full" />
									) : null}
									<Link href={`/categories/${item.category?.slug}`}>
										<h3 className="text-xs font-medium text-white hover:text-green-100">{item.name}</h3>
									</Link>
									<ul className="mt-4 space-y-4 [&>li]:text-neutral-500">
										{item.children?.map((child) => {
											if (child.category) {
												return (
													<li key={child.id} className="text-sm">
														<Link href={`/categories/${child.category.slug}`}>{child.category.name}</Link>
													</li>
												);
											}
											if (child.collection) {
												return (
													<li key={child.id} className="text-sm">
														<Link href={`/collections/${child.collection.slug}`}>
															{child.collection.name}
														</Link>
													</li>
												);
											}
											if (child.page) {
												return (
													<li key={child.id} className="text-sm">
														<Link href={`/pages/${child.page.slug}`}>{child.page.title}</Link>
													</li>
												);
											}
											if (child.url) {
												return (
													<li key={child.id} className="text-sm">
														<Link href={child.url}>{child.name}</Link>
													</li>
												);
											}
											return null;
										})}
									</ul>
								</div>
							</Fragment>
						);
					})}
				</div>

				<div className="flex flex-col justify-between py-8 sm:flex-row">
					<Box>
						<a href="tel:+995 591 458 118">
							<p className="text-sm text-neutral-500">+995 591 458 118</p>
						</a>
						<a href="mailto:sales@smart-wolf.com">
							<p className="text-sm text-neutral-500">sales@smart-wolf.com</p>
						</a>
					</Box>
					<p className="pt-6 text-sm text-neutral-500">
						Copyright &copy; {new Date().getFullYear()} Smart Wolf
					</p>
				</div>
			</div>
		</footer>
	);
}
