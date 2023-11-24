import { type ReactNode } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { KumaRegistry } from "@kuma-ui/next-plugin/registry";

export const metadata = {
	title: "Smart Wolf",
	description:
		"Welcome to our online store for dog lovers! We offer a wide range of high-quality products, clothes and equipment for your furry friends.",
};

export default function RootLayout(props: { children: ReactNode }) {
	return (
		<>
			<KumaRegistry>
				<main className="min-h-[calc(100vh-106px)] flex-grow">{props.children}</main>
			</KumaRegistry>
		</>
	);
}
