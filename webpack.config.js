const path = require("path");
const env  = require("@next2d/env");

const ESLintPlugin = require("eslint-webpack-plugin");
const Next2DWebpackAutoLoaderPlugin = require("@next2d/webpack-auto-loader-plugin");

module.exports = {
    "mode": "development",
    "entry": "./src/index.js",
    "watchOptions": {
        "ignored": [
            path.resolve(__dirname, "src/config/Config.js"),
            path.resolve(__dirname, "src/Packages.js")
        ]
    },
    "output": {
        "filename": "app.js",
        "path": path.join(__dirname, "/docs/assets/js/")
    },
    "module": {
        "rules": [{
            "test": /\.(png|svg|jpg|jpeg|gif)$/i,
            "type": "asset/inline"
        }]
    },
    "plugins": [
        // If you use eslint, please uncomment it.
        new ESLintPlugin({
            "fix": true
        }),
        new Next2DWebpackAutoLoaderPlugin(env(), { "LICENSE": false })
    ],
    "devServer": {
        "static": [
            { "directory": path.join(__dirname, "/dist") },
            { "directory": path.join(__dirname, "/mock") }
        ],
        "watchFiles": "src/config/*.json",
        "historyApiFallback": true,
        "compress": false,
        "open": true
    }
};