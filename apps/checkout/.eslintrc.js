module.exports = {
  root: true,
  extends: ["checkout"],
  plugins: ["formatjs"],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  rules: {
    "import/no-restricted-paths": [
      "error",
      {
        basePath: __dirname,
        zones: [
          { target: "./", from: "../../packages/" },
          { target: "./", from: "../../apps/", except: ["./checkout/"] },
        ],
      },
    ],
  },
};
