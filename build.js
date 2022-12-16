require('esbuild').build({
    entryPoints: ['./out/App.js'],
    bundle: true,
    minify: true,
    format: "esm",
    outdir: './www/js/',
  }).catch(() => process.exit(1));
