import { type ReactNode } from "react";
import { Footer } from "@/ui/components/Footer";
import { Header } from "@/ui/components/Header";

export const metadata = {
	title: "Smart Wolf",
	description:
		"Welcome to our online store for dog lovers! We offer a wide range of high-quality products, clothes and equipment for your furry friends.",
};

export default function RootLayout(props: { children: ReactNode }) {
	return (
		<>
			<Header />
			<main className="min-h-[calc(100vh-106px)] flex-grow">{props.children}</main>
			<Footer />
		</>
	);
}
