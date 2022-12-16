require('esbuild').build({
    entryPoints: ['./out/App.js'],
    bundle: true,
    minify: false,
    format: "esm",
    outdir: './www/js/',
    incremental: true,
    watch: true,
    logLevel:"info"
  }).catch(() => process.exit(1));
