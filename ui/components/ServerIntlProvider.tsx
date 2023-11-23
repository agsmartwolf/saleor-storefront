"use client";

import { IntlProvider, type MessageFormatElement } from "react-intl";
import { type ReactNode } from "react";

type ServerIntlProviderProps = {
	messages: Record<string, string> | Record<string, MessageFormatElement[]> | undefined;
	locale: string;
	children?: ReactNode;
};
export default function ServerIntlProvider({ messages, locale, children }: ServerIntlProviderProps) {
	return (
		<IntlProvider messages={messages} locale={locale}>
			{children}
		</IntlProvider>
	);
}
