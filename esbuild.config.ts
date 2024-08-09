const esbuild = require("esbuild");
const { dtsPlugin } = require("esbuild-plugin-d.ts");

const buildOptions = {
  entryPoints: ["./src/index.ts"],
  bundle: true,
  outdir: "dist",
  external: ["react", "react-dom"],
  sourcemap: true,
};

// ESM 빌드
esbuild
  .build({
    ...buildOptions,
    format: "esm",
    splitting: true,
    plugins: [dtsPlugin()],
  })
  .catch(() => process.exit(1));

// CJS 빌드
esbuild
  .build({
    ...buildOptions,
    format: "cjs",
    outExtension: {
      ".js": ".cjs",
    },
    plugins: [dtsPlugin()],
  })
  .catch(() => process.exit(1));
