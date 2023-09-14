const path = require("path");

const HTMLWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const webpack = require('webpack');

module.exports = (env, argv) => {

    const { mode } = argv;
    const prod = mode === "production";

    const target = prod ? "browserslist" : "web";
    const devtool = prod ? false : "source-map";

    return {
        mode,
        target,
        devtool,

        optimization: {
            minimize: prod,
        },

        devServer: {
            open: true,
            port: 8066,
            hot: true,
            historyApiFallback: {
                disableDotRule: true,
            },
        },

        context: path.resolve(__dirname, "src"),

        entry: ["@babel/polyfill", "./index.js"],

        output: {
            path: path.resolve(__dirname, "build"),
            clean: true,
            filename: "bundle.js",
            assetModuleFilename: "[path][name][ext]",
        },

        resolve: {
            extensions: [".js"],
        },

        plugins: [
            new HTMLWebPackPlugin({ template: "../public/index.html" }),
            new MiniCssExtractPlugin(),
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: "../public",
                        globOptions: {
                            ignore: ["**/index.html"],
                        },
                    },
                ],
            }),
            new webpack.ProvidePlugin({
                'React': 'react'
            })
        ],

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    // exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            "presets": ["@babel/preset-env", "@babel/preset-react"],
                            "plugins": [
                                "@babel/plugin-syntax-dynamic-import",
                                "@babel/plugin-proposal-class-properties"
                            ]
                        },
                    },
                },
                {
                    test: /\.(png|jpg|jpeg|svg|gif)$/i,
                    type: "asset/resource",
                },
                {
                    test: /\.css$/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 1,
                                modules: true,
                            },
                        },
                        "postcss-loader"
                    ],
                    include: /\.module\.css$/,
                },
                {
                    test: /\.css$/,
                    use: [
                        "style-loader",
                        "css-loader",
                        "postcss-loader"
                    ],
                    exclude: /\.module\.css$/,
                },
                {
                    test: /\.html$/,
                    use: ["html-loader"],
                },
            ],
        },
    }

};
