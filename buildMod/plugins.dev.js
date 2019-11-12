// const path = require("path");
const webpack = require('webpack');
// plugins
// const extractTextPlugin = require('extract-text-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
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
// 配置Plugins
let configPlugins = [
	// 使用ProvidePlugin注入隐式全局变量
	new webpack.ProvidePlugin({
		$: "jquery",
		jQuery: "jquery"
	}),

	// 分离公共类库
	new webpack.optimize.CommonsChunkPlugin(commonConfig.vendor),

	// html 生成(把js插入到页面)
	// new htmlPlugin(commonConfig.html.dev),
];

Object.keys(entryObj).forEach(item => {
	// 		{
	// 			filename: fileObj[item].filename,
	// 			template: fileObj[item].template,
	// 			chunks: [item]
	// 		}

	configPlugins.push(new HtmlWebpackPlugin(
		{
			filename: fileObj[item].filename,
			template: fileObj[item].template,
			chunks: [item]
		}
	))
});

module.exports = configPlugins;





