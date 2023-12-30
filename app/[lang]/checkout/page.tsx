import { invariant } from "ts-invariant";
import { RootWrapper } from "./pageWrapper";
import getIntl from "@/app/[lang]/intl";

// export const metadata = {
// 	title: "Shopping Cart",
// };

export default async function CheckoutPage({
	searchParams,
	params,
}: {
	searchParams: { checkout?: string; order?: string };
	params: { lang: string };
}) {
	invariant(process.env.NEXT_PUBLIC_SALEOR_API_URL, "Missing NEXT_PUBLIC_SALEOR_API_URL env variable");
	const { lang } = params;

	if (!searchParams.checkout && !searchParams.order) {
		return null;
	}

	const intl = await getIntl(lang, "checkout");

	return (
		<div className="checkout-bg min-h-[calc(100vh-106px)]">
			<section className="mx-auto max-w-7xl p-8">
				<div className="flex items-center font-bold">
					<a aria-label="homepage" href="/">
						Smart Wolf
					</a>
				</div>
				<h1 className="mt-8 text-3xl font-bold text-neutral-900">Checkout</h1>

				<section className="mb-12 mt-6">
					<RootWrapper
						saleorApiUrl={process.env.NEXT_PUBLIC_SALEOR_API_URL}
						intlMessages={intl.messages}
						locale={intl.locale}
					/>
				</section>
			</section>
		</div>
	);
}
