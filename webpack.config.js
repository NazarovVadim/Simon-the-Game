const path = require('path');
require("babel-polyfill");

	module.exports = {
		entry:{
		    main:['babel-polyfill', './src/index.js']
        },
        output:{
            path: path.resolve(__dirname, './dist'),
            filename: '[name].js',
            publicPath: '/dist'
        },
        devServer: {
            overlay: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: '/node_modules/'
                }
            ]
        }
    }