const { withKumaUI } = require("@kuma-ui/next-plugin");

/** @type {import('next').NextConfig} */
const config = {
	images: {
		remotePatterns: [
			{
				hostname: "*",
			},
		],
	},
	experimental: {
		typedRoutes: false,
	},
	reactStrictMode: true,
	productionBrowserSourceMaps: true,
};

module.exports = withKumaUI(config);
// export default config
