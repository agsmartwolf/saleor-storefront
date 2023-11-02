import { createTheme } from "@kuma-ui/core";

const theme = createTheme({
	colors: {
		white: "#ffffff",
		gray: "#f5f4f4",
	},
	fontSizes: {
		xs: "1.1rem",
		sm: "1.2rem",
		base: "1.4rem",
		md: "1.6rem",
		lg: "2.4rem",
		xl: "3.2rem",
	},
});

type UserTheme = typeof theme;

declare module "@kuma-ui/core" {
	export interface Theme extends UserTheme {}
}

export default theme;
