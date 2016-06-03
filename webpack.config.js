var path = require('path');
module.exports = {
    entry: ["./react/app.js", 'babel-polyfill'],
    output: {
        path: __dirname+'/public/javascripts',
        filename: "bundle.js"
    },
    module: {
        loaders: [
		    {
		      loader: "babel-loader",

		      // Skip any files outside of your project's `src` directory
		      include: [
		        path.resolve(__dirname, "react"),
		      ],

		      // Only run `.js` and `.jsx` files through Babel
		      test: /\.js?$/,

		      // Options to configure babel with
		      query: {
		        plugins: ['transform-runtime'],
		        presets: ['es2015', 'stage-0', 'react'],
		      }
		    }
		  ]
    }
};