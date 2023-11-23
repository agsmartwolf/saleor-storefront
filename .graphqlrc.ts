import * as envpkg from '@next/env';
const { loadEnvConfig } = envpkg;
import type { CodegenConfig } from "@graphql-codegen/cli";

// @ts-ignore
loadEnvConfig(process.cwd());

// @ts-ignore
const schemaUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL;
// @ts-ignore
const saleorApiToken = process.env.SALEOR_API_TOKEN;

if (!schemaUrl) {
	// @ts-ignore
	console.error(
		"Before GraphQL types can be generated, you need to set NEXT_PUBLIC_SALEOR_API_URL environment variable.",
	);
	// @ts-ignore
	console.error("Follow development instructions in the README.md file.");
	// @ts-ignore
	process.exit(1);
}

const config: CodegenConfig = {
	overwrite: true,
	schema: {
		[schemaUrl]: {
			headers: {
				'Cache-Control': 'no-cache',
				authorization: saleorApiToken
			}
		},
	},
	documents: ["graphql/**/*.graphql", "checkout/graphql/*.graphql"],
	generates: {
		"gql/": {
			preset: "client",
			plugins: [],
			config: {
				documentMode: "string",
				useTypeImports: true,
				strictScalars: true,
				scalars: {
					Date: "string",
					DateTime: "string",
					Day: "number",
					Decimal: "number",
					GenericScalar: "unknown",
					JSON: "unknown",
					JSONString: "string",
					Metadata: "Record<string, string>",
					Minute: "number",
					PositiveDecimal: "number",
					UUID: "string",
					Upload: "unknown",
					WeightScalar: "unknown",
					_Any: "unknown",
				},
			},
			presetConfig: {
				fragmentMasking: false,
			},
		},
		'./graphql.schema.json': {
			plugins: ['introspection'],
		}
	},
};

export default config;
