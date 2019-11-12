// 组件引用
import ajax from "../vendors/ajax/config";
import miniTpl from "../vendors/mini-tpl/mini-tpl";

;(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.orderDetails = factory();
	}
})(this, function() {

	/**
	 * 模板
	 */

	/**
	 * 数据
	 */
	// 接口参数和返回数据
	var data = {
		// 订单支付信息
		orderInfo : {
			reqUrl	: "2/lancare_customhouse_interface_Tianjin/api:pay_order_package_info",
			reqDevUrl	: "2/lancare_customhouse_interface_Tianjin/api:pay_order_package_info",
			reqJson : "../../service/orderForm/orderInfo.json",
			flag		: true
		},
		// 确认订单支付信息
		sureOrderInfo : {
			reqUrl	: "2/lancare_customhouse_interface_Tianjin/api:pay_submit",
			reqDevUrl	: "2/lancare_customhouse_interface_Tianjin/api:pay_submit",
			reqJson : "../../src/data/customs.json",
			flag		: false
		},
	};

	/**
	 * 本地数据
	 */
	var global = {};

	/**
	 * 页面操作（1. 插入DOM）
	 */
	var loadOrder = function (id, url, d) {
		// console.log(data.cacheCustoms);
		// console.log(data.cacheCustoms.sale_list);
		// console.log(tpl);
		console.log(d.item_info[12]);
		// 模板替换
		var _html = miniTpl(tpl.orderForm, d);
		// 插入DOM
		$("body").append(_html);
		// 绑定事件
		bindEvent(id, url);
	};

	/**
	 * DOM事件绑定
	 */
	var bindEvent = function (id, url) {
		// 获取元素
		var $tg_list = $(".tg_list").find("li"),
			$ig_user = $(".ig_user ");

		// 绑定取货方式事件
		$tg_list.click(function (){
			selectClickHand(id, url, this);
		});

		// 模拟点击
		// $tg_list.eq(1).click();
	};

	/**
	 * 请求数据
	 * @param {Function} examine 		请求初始化信息
	 */
	// 请求订单支付信息接口
	var orderForm = function (id, url, orderPackageId) {
		// 判断是请求本地json数据，请求方式设置为GET
		if (data.orderInfo.flag && ajax.isLocal()){
			// 请求方式
			ajax.config.type = "get";
		}
		// 请求URL
		ajax.config.url = ajax.reqUrl(data.orderInfo, siteUrl);
		// http://h.lk.cn/drugstore/tab:stock_adjust/adjust:output/act:del_document
		// 请求参数
		ajax.config.data = {
			order_package_id: orderPackageId,
		};
		console.log(ajax.config.data);
		// 请求数据
		ajax.reqDataApi(ajax.config,function (res) {
			// console.log(res);
			if (res.ResultCode == 1) {
				console.log(res.Result);
				// 存储自取地址
				global.takingSelf = res.Result.address_info;
				// 载入订单提交信息
				loadOrder(id, url, res.Result);
			} else {
				console.log(res.ResultDescription);
				// alert(res.msg);
			}
		});
	};

	/**
	 * 初始化方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var init = function (id, url) {
		// 获取版本号
		// getAppVersion();
		// 载入HEADER

		orderForm(id, url, global.orderPackageId);
	};
	return init;
});



