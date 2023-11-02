import { type ReactNode } from "react";

export const metadata = {
	title: "Checkout",
	description: "Checkout Smart Wolf products",
};

export default function RootLayout(props: { children: ReactNode }) {
	return <main>{props.children}</main>;
}
