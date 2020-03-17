const projectName = require('./project');

const config = {
	// 海关预约首页
	projectA:{
		localPath:'./src/projects/projectA/',
		uploadPath:'/h5/test/cb/',
		commonPath: '../common/customsCom.js',
	},
	// 预约 升级 签约
	projectB:{
		localPath:'./src/projects/projectB/',
		uploadPath:'/h5/act/tf/',
		commonPath: '../common/examineCom.js',
	},
	// 预约支付
	projectC:{
		localPath:'./src/projects/projectC/',
		uploadPath:'/h5/test/tf/',
		commonPath: '../common/orderForm.js',
	},
	// 未支付详情
	projectD:{
		localPath:'./src/projects/projectD/',
		uploadPath:'/h5/test/tf/',
		commonPath: '../common/orderDetails.js',
	},
	// 服务详情
	projectE:{
		localPath:'./src/projects/projectE/',
		uploadPath:'/h5/test/tf/',
		commonPath: '../common/serviceCom.js',
	}
};

const configObj = config[projectName.name];
module.exports = configObj;