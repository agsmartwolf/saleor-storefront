"use client";

import dynamic from "next/dynamic";
import { type MessageFormatElement } from "react-intl";

const Root = dynamic(() => import("../../../checkout/Root").then((m) => m.Root), { ssr: false });

export const RootWrapper = ({
	saleorApiUrl,
	intlMessages,
	locale,
}: {
	saleorApiUrl: string;
	intlMessages: Record<string, MessageFormatElement[]> | Record<string, string>;
	locale: string;
}) => {
	if (!saleorApiUrl) {
		return null;
	}
	return <Root saleorApiUrl={saleorApiUrl} intlMessages={intlMessages} locale={locale} />;
};
