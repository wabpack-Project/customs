/**
 * @fileoverview 应用启动入口文件，运行构建环境
 * @author liyifei
 * @date 2017/10
 */

const express = require('express');
const build = express();
// 打开浏览器
var opn = require('opn');
// 用户查找 ip 地址
var address = require('address');

// 端口
let port = 8002;
// url指向静态文件地址
let staticDir = './dist/';
// 访问页面Url
let webUrl = '/themes/simplicity/html/mobile_iphone/lancarecustomhouseinterfaceTianjin.html';

// 路由
// 静态资源
build.use('/', express.static(staticDir));

build.listen(port, function() {
    console.log('Web running on Production... Open http://localhost:' + port + webUrl);
	  // opn("http://" + address.ip() + ":" + port + webUrl);
	  opn("http://localhost:" + port + webUrl);
});

// 访问地址
// http://localhost:8002/themes/simplicity/html/mobile_iphone/lancarecustomhouseinterfaceTianjin.html
