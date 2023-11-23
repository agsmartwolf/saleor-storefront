import { Inter } from "next/font/google";
import "./globals.css";
import { type ReactNode } from "react";
import { type Metadata } from "next";
import { KumaRegistry } from "@kuma-ui/next-plugin/registry";
import { AuthProvider } from "../ui/components/AuthProvider";
import { DraftModeNotification } from "../ui/components/DraftModeNotification";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Saleor Storefront example",
	description: "Starter pack for building performant e-commerce experiences with Saleor.",
	metadataBase: process.env.NEXT_PUBLIC_STOREFRONT_URL
		? new URL(process.env.NEXT_PUBLIC_STOREFRONT_URL)
		: undefined,
};

export async function generateStaticParams() {
	return [{ lang: "en" }, { lang: "ru" }];
}

export default function RootLayout(props: { children: ReactNode; params: { lang: string } }) {
	return (
		<html lang={props.params.lang}>
			<body className={`${inter.className} flex min-h-screen flex-col`}>
				<AuthProvider>
					<KumaRegistry>{props.children}</KumaRegistry>
				</AuthProvider>
				<DraftModeNotification />
			</body>
		</html>
	);
}
