"use client";
import { ErrorBoundary } from "react-error-boundary";
import {
	type Client,
	Provider as UrqlProvider,
	cacheExchange,
	createClient,
	dedupExchange,
	fetchExchange,
} from "urql";

import { ToastContainer } from "react-toastify";
import { useAuthChange, useSaleorAuthContext } from "@saleor/auth-sdk/react";
import { useState } from "react";
import { RawIntlProvider, type MessageFormatElement, type IntlShape } from "react-intl";
import { createIntl } from "@formatjs/intl";
import { alertsContainerProps } from "./hooks/useAlerts/consts";
import { RootViews } from "./views/RootViews";
import { PageNotFound } from "./views/PageNotFound";
import "./index.css";

export const Root = ({
	saleorApiUrl,
	intlMessages,
	locale,
}: {
	saleorApiUrl: string;
	intlMessages: Record<string, MessageFormatElement[]> | Record<string, string>;
	locale: string;
}) => {
	const saleorAuthClient = useSaleorAuthContext();
	const intl = createIntl({ locale, messages: intlMessages });

	const makeUrqlClient = () =>
		createClient({
			url: saleorApiUrl,
			suspense: true,
			requestPolicy: "cache-first",
			fetch: (input, init) => saleorAuthClient.fetchWithAuth(input as NodeJS.fetch.RequestInfo, init),
			exchanges: [dedupExchange, cacheExchange, fetchExchange],
		});

	const [urqlClient, setUrqlClient] = useState<Client>(makeUrqlClient());
	useAuthChange({
		saleorApiUrl,
		onSignedOut: () => setUrqlClient(makeUrqlClient()),
		onSignedIn: () => setUrqlClient(makeUrqlClient()),
	});

	return (
		<UrqlProvider value={urqlClient}>
			<ToastContainer {...alertsContainerProps} />
			<RawIntlProvider value={intl as IntlShape}>
				<ErrorBoundary FallbackComponent={PageNotFound}>
					<RootViews />
				</ErrorBoundary>
			</RawIntlProvider>
		</UrqlProvider>
	);
};
