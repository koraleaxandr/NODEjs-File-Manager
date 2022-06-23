import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import path from 'path';

const config = {
    entry:  './src/app.ts',
    output: {
        path: path.resolve('./dist'),
        filename: '[name].cjs',
    },
    target: 'node-webkit',
    plugins: [
        new CleanWebpackPlugin(),        
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'json'],
      },
    module: {
        rules: [
             // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.            
             {
                 test:/.(ts|tsx)$/i,
                 loader: "ts-loader"
             },
             // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
             {
                 test: /\.js$/,
                 loader: "source-map-loader"
             },
        ]},        
    mode: 'production',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
      },
    //   resolve: {
    //     fallback: { "http": require.resolve("stream-http") },
    //   },
};

export default config
