import * as path from "path";
import * as webpack from "webpack";
const ESLintPlugin = require("eslint-webpack-plugin");

const peerDependencies = {
    "@date-io/date-fns": "^2.11.0",
    "@emotion/react": "^11.7.1",
    "@emotion/styled": "^11.6.0",
    "@mui/icons-material": "^5.3.0",
    "@mui/lab": "^5.0.0-alpha.65",
    "@mui/material": "^5.3.0",
    "@mui/styles": "^5.3.0",
    "axios": "^0.25.0",
    "date-fns": "^2.28.0",
    "formik": "^2.2.9",
    "i18next": "^21.6.7",
    "prop-types": "^15.8.1",
    "react": "^17.0.2",
    "react-beautiful-dnd": "^13.1.0",
    "react-beforeunload": "^2.5.2",
    "react-dom": "^17.0.2",
    "react-highlight-words": "^0.17.0",
    "react-i18next": "^11.15.3",
    "react-router-dom": "^6.2.1",
    "yup": "^0.32.11"
};

const externals = Object.fromEntries(Object.keys(peerDependencies).map(peerDependency => [peerDependency, peerDependency]));

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
    },
    plugins: [
        new ESLintPlugin({
            extensions: [".tsx", ".ts", ".js"],
        }),
    ],
    externals,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        libraryTarget: "umd",
    },
};

export default config;
