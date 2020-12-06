const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './build/main.js',
    optimization: {
        minimize: true,
    },
    output: {
        filename: 'userscript.js',
        path: path.resolve(__dirname, 'dist'),
    },
};