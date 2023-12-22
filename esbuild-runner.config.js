// node -r esbuild-runner/register src/main.ts
module.exports = {
    type: "transform", // bundle or transform (see description above)
    esbuild: /** @type {import("esbuild").BuildOptions} */ ({
        //entryPoints: ['src/main.ts'],
        //bundle: true,
        //outdir: './dist2',
        //packages: 'external',
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
    }),
};
