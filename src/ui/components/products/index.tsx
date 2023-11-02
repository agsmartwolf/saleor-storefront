"use client";
import dynamic from "next/dynamic";

export const ProductGalleryNoSSR = dynamic(
	() => import("./ProductGallery").then((m) => ({ default: m.ProductGallery })),
	{
		ssr: false,
	},
);

export const ProductGallery = (props: any) => <ProductGalleryNoSSR {...props} />;
