import * as path from "path";
import * as webpack from "webpack";
const ESLintPlugin = require("eslint-webpack-plugin");

const config: webpack.Configuration = {
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@arteneo/forge": path.resolve(__dirname, "src"),
        },
    },
    plugins: [
        new ESLintPlugin({
            extensions: [".tsx", ".ts", ".js"],
        }),
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
    },
};

export default config;
