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

module.exports = config;
// export default config
