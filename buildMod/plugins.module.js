const path = require("path");
const webpack = require('webpack');
// plugins
const extractTextPlugin = require('extract-text-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const cleanPlugin = require('clean-webpack-plugin');
// 通用配置
const commonConfig = require('./common');
// 多模块入口
const entryObj = require('../buildMod/entry');
// 定义变量
const htmlObj = {};
// 获取入口数组
const htmlArr = Object.keys(entryObj);
console.log("htmlArr", htmlArr);
// 文件数组
const fileObj = {
	customs: {
		filename: 'index.html',
		template: commonConfig.devPath + 'page/home.html',
	},
	examine: {
		filename: 'lancarecustomhouseinterfaceTianjin.html',
		template: commonConfig.devPath + 'page/lancarecustomhouseinterfaceTianjin.html',
	},
};
// 遍历赋值
htmlArr.forEach(item => {
	htmlObj[item] = fileObj[item];
	htmlObj[item].chunks = [item];
});
console.log("htmlObj", htmlObj);
// configPlugins
let configPlugins = [
	// 分离 css 文件
	new extractTextPlugin({
		filename: commonConfig.css.buildPath + '[name].[contenthash:8].css',
		allChunks: true
	}),
	// 分离公共类库
	new webpack.optimize.CommonsChunkPlugin({
		name: ['vendor', 'manifest'],
		minChunks: Infinity
	}),
	// html 生成
	new htmlPlugin(commonConfig.html),

	// html 生成
	// Object.keys(entryObj).forEach(item => {
	// 	console.log({
	// 		filename: fileObj[item].filename,
	// 		template: fileObj[item].template,
	// 		chunks: [item]
	// 	});
	// 	new htmlPlugin(
	// 		{
	// 			filename: fileObj[item].filename,
	// 			template: fileObj[item].template,
	// 			chunks: [item]
	// 		}
	// 	);
	// }),

];

// plugins
module.exports = [

	// 分离 css 文件
	new extractTextPlugin({
		filename: commonConfig.css.buildPath + '[name].[contenthash:8].css',
		allChunks: true
	}),
	// 分离公共类库
	new webpack.optimize.CommonsChunkPlugin({
		name: ['vendor', 'manifest'],
		minChunks: Infinity
	}),
	// html 生成
	new htmlPlugin(commonConfig.html),

	// html 生成
	// Object.keys(entryObj).forEach(item => {
	// 	console.log({
	// 		filename: fileObj[item].filename,
	// 		template: fileObj[item].template,
	// 		chunks: [item]
	// 	});
	// 	new htmlPlugin(
	// 		{
	// 			filename: fileObj[item].filename,
	// 			template: fileObj[item].template,
	// 			chunks: [item]
	// 		}
	// 	);
	// }),

	// 清理发布目录
	// new cleanPlugin(path.join(__dirname, '../dist')),
	// new cleanPlugin(),
	// new cleanPlugin(['dist']),
	new cleanPlugin(['dist'], {
		root: path.resolve(__dirname, '..'),   //根目录
		"dry": false
		//其他配置按需求添加
	}),
];

// const HtmlWebpackPlugin = require('html-webpack-plugin')
//
// let configPlugins = []
//
// Object.keys(entryObj).forEach(item => {
// 	configPlugins.push(new HtmlWebpackPlugin(
// 		{
// 			filename: '../dist/' + item + '.html',
// 			template: path.resolve(__dirname, '../index.html'),
// 			chunks: [item]
// 		}
// 	))
// })
//
// module.exports = configPlugins



