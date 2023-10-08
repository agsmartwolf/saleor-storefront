module.exports = {
  extends: ["checkout"],
  plugins: ["formatjs"],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ["__tests__"],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
    "formatjs/enforce-id": [
      "error",
      {
        idInterpolationPattern: "[folder]/[name]/[sha512:contenthash:base64:6]",
      },
    ],

    "import/no-restricted-paths": [
      "error",
      {
        basePath: __dirname,
        zones: [
          { target: "./", from: "../../packages/" },
          { target: "./", from: "../../apps/", except: ["./saleor-app-checkout/"] },
        ],
      },
    ],
  },
};
