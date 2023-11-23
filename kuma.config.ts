import { createTheme } from "@kuma-ui/core";

export const theme = createTheme({
	colors: {
		white: "#ffffff",
		gray: "#f5f4f4",
		green: {
			"100": "#f5f4f4",
		},
		black: {
			black: "#171717",
			"300": "#171717",
			"200": "#171717",
			"100": "#0a0a0a",
		},
	},
	fontSizes: {
		xs: "1.1rem",
		sm: "1.2rem",
		base: "1.4rem",
		md: "1.6rem",
		lg: "2.4rem",
		xl: "3.2rem",
	},
	components: {
		Button: {
			defaultProps: {
				bg: "#88f98c", // bg is short for background
				p: "12px 40px", // p is short for padding
				color: "#0a0a0a",
			},
		},
	},
});

type UserTheme = typeof theme;

declare module "@kuma-ui/core" {
	export interface Theme extends UserTheme {}
}

export default theme;
