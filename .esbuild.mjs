
import esbuild from 'esbuild';


async function build() {
  let ctx = await esbuild.context({
    entryPoints: ['src/main.ts'],
    bundle: true,
    outdir: './dist',
    packages: 'external',
    format: 'cjs',
    target: 'node20',
    platform: 'node',
    sourcemap: true,
    loader: {
      '.node': 'copy',
      '.json': 'copy',
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
