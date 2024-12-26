
const esbuild = require('esbuild');

async function build() {
  let ctx = await esbuild.context({
    entryPoints: [
      __dirname + '/src/main.ts'
    ],
    bundle: true,
    outdir: __dirname + '/dist',
    //packages: 'external',
    format: 'cjs',
    target: 'node20',
    platform: 'node',
    sourcemap: true,
    loader: {
      '.node': 'copy',
      //'.json': 'copy',
      '.config.json': 'copy',
      '.schema.json': 'copy',
    },
    assetNames: '[name]',
    alias: {
      '@repo/gameserver': '.',
    },
    keepNames: true,
    logLevel: 'info',
  });

  if (process.argv.includes('--watch'))
    await ctx.watch();
  else {
    await ctx.rebuild();
    await ctx.dispose();
  }
}

build();
