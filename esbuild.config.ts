const esbuild = require("esbuild");

const buildOptions = {
  entryPoints: ["./src/index.ts"],
  bundle: true,
  loader: { ".tsx": "tsx", ".ts": "ts" },
  external: ["react", "react-dom"],
  sourcemap: true,
};

// ESM 빌드
esbuild
  .build({
    ...buildOptions,
    format: "esm",
    outdir: "dist/esm",
  })
  .catch(() => process.exit(1));

// CJS 빌드
esbuild
  .build({
    ...buildOptions,
    format: "cjs",
    outdir: "dist/cjs",
  })
  .catch(() => process.exit(1));
