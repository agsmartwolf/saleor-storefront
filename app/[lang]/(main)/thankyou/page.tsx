import getIntl from "@/app/[lang]/intl";

export default async function ThankyouPage(props: { params: { lang: string } }) {
	const { params } = props;
	const { lang } = params;
	const intl = await getIntl(lang, "thankyou");
	const content = {
		header: intl.formatMessage({
			id: "header",
		}),
		subtitle: intl.formatMessage({
			id: "subtitle",
		}),
	};

	return (
		<section className="mx-auto max-w-7xl p-8">
			<h1>{content.header}</h1>
			<p>{content.subtitle}</p>
		</section>
	);
}
