const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        chunkFilename: '[id].js',
        publicPath: ''
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test:/\.js[x]$/,
                loader:'babel-loader',
                exclude:/node_modules/
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
                        postcssOptions:{
                            plugins: () => [postcssPresetEnv({ stage: 0 })]
                        }
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
                  limit: 8192,
                },
              },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ]
}