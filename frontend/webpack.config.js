const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const postcssPresetEnv = require("postcss-preset-env");

module.exports = (env = {}) => {
    const { mode = "development" } = env;

    const isDev = mode === "development";
    const isProd = mode === "production";

    return {
        entry: "./src/index.jsx",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js",
            chunkFilename: "[id].js",
            publicPath: "",
        },
        resolve: {
            extensions: [".js", ".jsx"],
            alias: {
                variables: path.resolve(__dirname + "/src/_variables.scss"),
                functions: path.resolve(__dirname + "/src/_functions.scss"),
                actions: path.resolve(__dirname + "/src/store/actions/"),
                images: path.resolve(__dirname + "/src/static/images/"),
            },
        },
        module: {
            rules: [
                {
                    test: /\.js[x]$/,
                    loader: "babel-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.((c|sa|sc)ss)$/i,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 1,
                                modules: { auto: true },
                            },
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: () => [
                                        postcssPresetEnv({ stage: 0 }),
                                    ],
                                },
                            },
                        },
                        {
                            loader: "sass-loader",
                        },
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                    loader: "url-loader",
                    options: {
                        limit: 15000,
                    },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: __dirname + "/src/index.html",
                filename: "index.html",
                inject: "body",
                publicPath: "/",
            }),
        ],
        devServer: {
            historyApiFallback: true,
            contentBase: "./",
            hot: true,
        },
        externals: {
            Config: JSON.stringify(
                isProd
                    ? require("./config.prod.json")
                    : require("./config.dev.json")
            ),
        },
    };
};
