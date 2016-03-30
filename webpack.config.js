/**
 * Created by xiaoxiaosu on 2015/12/14.
 */
var path = require('path');

module.exports={
    entry:"./app/main.js",
    output:{
        path:"./output",
        filename:"bundle.js"
    },
    resolve: {
        root: path.resolve('./'),
    },
    module:{
        loaders:[
            // {test:/\.(js)$/,loader:"jsx-loader?harmony"},
            {test:/\.(css)$/,loader:"style!css!"},
            {test: /\.less/,loader: 'style!css!less!'},
            {test: /\.scss$/,loader: 'style!css!sass!scss!'},
            {test:/\.(png!jpg)$/,loader:"url?size=8192"},
            { test: /\.ejs$/, loader: "ejs-loader"}
        ]
    }
}