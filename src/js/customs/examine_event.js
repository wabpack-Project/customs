/*
 * 业务依赖组件
 */
// import $ from "../vendors/jquery/jquery-1.10.2.min";
// JQ引用第一种方式
// var $ = require("../vendors/jquery/jquery-1.10.2.min");
// window.jQuery = $;
// window.$ = $;

import "../vendors/Js/Array.extension";
// import "../vendors/Js/tool";
var tool = require("../vendors/Js/tool");
// import ajax from "../vendors/ajax/config";
var ajax = require("../vendors/ajax/config");
// import miniTpl from "../vendors/mini-tpl/mini-tpl";
var miniTpl = require("../vendors/mini-tpl/mini-tpl");
// import draw from "../vendors/drawer/drawer_m";
var draw = require("../vendors/drawer/drawer_m");
// import quantity from "../vendors/Quantity/quantityOpt";
var quantity = require("../vendors/Quantity/quantityOpt");

// 头部组件
// import header from "../vendors/header/js/header";

// <!-- 模板-->
// import examine from "./tpl";
// var tpl = require("./tpl");
var tpl = require("../../modules/examine/tpl");
// 图片引用
// import '../../images/customs/drugBox.png';
var imgSrc = require('../../images/customs/drugBox.png');
// var imgBanner = require('../../images/customs/banner.jpg');
console.log(imgSrc);
// console.log(imgBanner);
// 本地数据引用
// var customsJson = require('../../data/customs.json');
// import '../../data/customs.json';
// import * as res from '../../data/customs.json';
// debugger
// console.log(res);
/**
 * 业务逻辑
 *
 * */
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(factory);
	} else if (typeof exports === 'object') {
		// Node, CommonJS-like
		// es6 module , typescript
		var mo = factory();
		mo.__esModule = true;
		mo['default'] = mo;
		module.exports = mo;
	} else {
		// browser
		root.examine = factory();
	}
}(this, function () {

	/**
	 * 工具类
	 *
	 * */
	// 判断对象是否为空
	var isEmptyObj = function (obj) {
		if (JSON.stringify(obj) === "{}"){
			return true;
		}
		return false;
	};

	// 赋值对象
	// Json序列化克隆对象
	var deepClone = function(obj){
		return JSON.parse(JSON.stringify(obj));
	};

	// 新建对象
	function newObj(obj) {
		var datas = [];
		for (var key in obj) {
			var data = {};//每次循环的时候，新建对象
			data.name = key;
			datas.push(data);
		}
		console.log(datas);
		return datas;
	};
	// 获取地址栏参数(所有参数返回一个对象)
	var getRequest = function() {
		//获取url中"?"符后的字串
		var url = window.location.search,
				theRequest = {};	// 定义参数空数组
		// 判断地址栏上有参数
		if (url.indexOf("?") != -1) {
			// 获取地址栏参数，把参数拆分成数组
			var str = url.substr(1),						// 获取地址栏参数
					strArr = str.split("&"),		// 把参数拆分成数组
					i = 0, len = strArr.length;
			// 遍历参数数组
			for(; i < len; i++) {
				theRequest[strArr[i].split("=")[0]]=decodeURI(strArr[i].split("=")[1]);
			}
		}
		return theRequest;
	};
	// 获取地址栏参数(返回指定参数)
	var getRequestParam = function (str) {
		var searchStr = window.location.search;
		// 判断地址栏上有参数
		if (searchStr.indexOf("?") == -1) return;
		// 获取地址栏参数
		var searchArr = searchStr.split(/[?=&]/);
		// 返回指定参数
		return searchArr[searchArr.indexOf(str)+1];
	};

	// 验证非法输入
	var checkIllegalInput = function (el) {
		// 非法输入正则
		var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
		// 获取输入框值
		var inputTxt = $(el).val();
		// 替换输入框获取的字符
		var str = inputTxt.replace(pattern, '');
		// 替换输入框值
		$(el).val(str);
	};

	/**
	 * 模板
	 */
	// var _tpl = "";
	/**
	 * 数据
	 */
	// 接口参数和返回数据
	var data = {
		copy_application: {
			reqUrl	: "2/lancare_customhouse_interface_Tianjin/api:copy_application_context_entry_or_exit_destination_duration_for_sale_item",
			reqDevUrl	: "2/lancare_customhouse_interface_Tianjin/api:copy_application_context_entry_or_exit_destination_duration_for_sale_item",
			reqJson : "../../service/examine/customs.json",
			flag		: false
		},
		examine: {
			reqUrl	: "2/lancare_customhouse_interface_Tianjin/api:registration_sale_item",
			reqDevUrl	: "2/lancare_customhouse_interface_Tianjin/api:registration_sale_item",
			reqJson : "../../service/examine/customs.json",
			flag		: true
		},
		submitExamine: {
			reqUrl	: "2/lancare_customhouse_interface_Tianjin/api:add_purchase_sale_item",
			reqDevUrl	: "2/lancare_customhouse_interface_Tianjin/api:add_purchase_sale_item",
			reqJson : "../../service/examine/customs.json",
			flag		: false
		},
		shop_cart_batch: {
			reqUrl	: "ajax_customs_shop_cart/act:batch",
			reqDevUrl	: "ajax_customs_shop_cart/act:batch",
			reqJson : "../../service/examine/customs.json",
			flag		: false
		},
		shop_cart_delall: {
			reqUrl	: "ajax_customs_shop_cart/act:delall",
			reqDevUrl	: "ajax_customs_shop_cart/act:delall",
			reqJson : "../../service/examine/customs.json",
			flag		: false
		},
		cacheCustoms: "",
		routes: [],
		signArr: ['1', '2', '3'],
	};
	// 本地数据
	var global = {
		total: 0,
		price: {},
		recordEl:"",
		data: {
			vaccArr: [],
			selectArr: {},
			physicalsArr: [],
			visitsInfo: {},
		},
		signPrice: 0,
		signUpdateInfo: {},
		isflag: false,
	};

	/**
	 * 页面操作（1. 插入DOM）
	 */
	// 载入预约主界面
	var loadCustoms = function (id) {
		// console.log(data.cacheCustoms);
		// console.log(data.cacheCustoms.sale_list);
		// console.log(tpl);
		// 模板替换
		var _html = miniTpl(tpl.customs, data.cacheCustoms);
		// 插入DOM
		$(".wui_wrapper").append(_html);
		// 显示底部按钮
		$(".footer").show();
		// 绑定事件
		bindEvent(id);
	};

	// 载入出入境项目
	var loadSign = function () {
		console.log(data.cacheCustoms);
		console.log(tpl);
		// 模板替换
		// var _html = miniTpl(tpl.customs, data.cacheCustoms);
		// 插入DOM
		// $(".wui_wrapper").append(_html);
		// 绑定事件
		// bindEvent();
	};

	// 载入弹出层
	var loadDraw = function (_tpl, _data, callback, n, id, sureCallback, cancelCallback) {
		// console.log(_data);
		// console.log(_tpl);
		// 显示模板
		draw({
			innerText: _tpl,
			data: _data,
			onShow: function (el) {
				// console.log("弹窗显示后触发事件");
				// 触发回调方法
				callback && callback(el);
			},
			onSure: function (el, obj) {		// 触发确认后事件
				// console.log("确认！");
				sureCallback && sureCallback(el, obj, n, id, _data);
			},
			onCancel: function (el, obj) {		// 触发取消或关闭后事件
				// console.log("取消！");
				cancelCallback && cancelCallback(el, obj);
			},
		});
	};

	// 可配置参数载入弹出层
	var loadBaseDraw = function (opts, callback) {
		// console.log(_data);
		// console.log(_tpl);
		// 显示模板
		draw({
			innerText: opts.tpl,
			data: opts.data,
			maskClose: opts.maskClose,
			onCancel: opts.onCancel,
			onShow: function (el) {
				// console.log("弹窗显示后触发事件");
				// 触发回调方法
				callback && callback(el);
			},
		});
	};

	// 载入药品列表
	var loadDrug = function (_tpl, _data) {
		// console.log(_data);
		// console.log(_tpl);
		// 渲染模板
		var _Html = miniTpl(_tpl, _data);
		// 插入HTML
		$("body").append(_Html);
		// 替换购物车图片
		if (imgSrc){
			$(".drug_box").attr("src", imgSrc);
		}

	};

	/**
	 * DOM事件绑定
	 */
	var bindEvent = function (id) {
		// 获取元素
		var $cp_select = $(".cp_list").find("li"),
			$related_sign = $(".related_sign"),
			$p_drop = $(".p_drop"),
			$appointment = $("#appointment");

		// 绑定点击下拉事件
		$p_drop.click(dropClickHand);

		// 绑定点击选中事件
		$cp_select.click(selectClickHand);

		// 根据hash进行跳转
		if (location.hash.indexOf("drug") >= 0){
			// alert("location.hash");
			$cp_select.eq(5).click();
		}
		
		// 绑定已选登记点击事件
		$related_sign.click(function (e) {
			e.stopPropagation();
		});

		// 模拟点击
		// $cp_select.eq(5).click();

		// 绑定立即预约
		$appointment.click(function () {
			// console.log(0, global.isflag);
			// 判断是否禁用预约按钮, 为true 阻止预约
			// if (global.isflag) return;
			// 判断没有选择预约项目
			if (isEmptyObj(global.data.selectArr)) {
				alert(data.cacheCustoms.empty_submit);
				return;
			}
			// 提交预约
			appointmentHand(id, $cp_select, this);
		});
	};

	// 绑定弹出层点击事件
	var bindDrawEvent = function (el, callback) {
		// 获取元素
		var $p_select = el.find("li");

		// 绑定点击多选选中事件
		$p_select.click(function () {
			callback && callback(selectDrawClickHand(this));
		});

	};

	// 立即预约事件
	var appointmentHand = function (id, el, appEl) {
		// console.log("立即预约事件");
		// 判断是否需要预约
		if ($("[attr_related='1']").find(".iconiconfontxuanzhong4").length > 0){
			// console.log("需要预约！");
			global.related = true;
		}
		// global.related = false;
		// 需要预约时间操作
		if (global.related){
			timeHand(id);
			return;
		}
		console.log(global.data);
		// 提交预约
		submitExamine(id, appEl);

	};

	// 点击下拉事件
	var dropClickHand = function (e) {
		e.stopPropagation();
		if ($(this).hasClass("iconxiangxia")){
			// 判断是否有项目介绍
			if ($(this).hasClass("noCon")){
				return;
			}
			// 展开下拉
			$(this).removeClass("iconxiangxia").addClass("iconxiangshang");
			// todo: 相关操作
			$(this).parents(".p_item").find(".p_item_des").show();

		} else if ($(this).hasClass("iconxiangshang")){
			$(this).removeClass("iconxiangshang").addClass("iconxiangxia");
			// todo: 相关操作
			$(this).parents(".p_item").find(".p_item_des").hide();
		}
	};

	// 点击选中事件
	var selectClickHand = function (e) {
		e.stopPropagation();
		selectOpt(this);
	};

	// 弹出层点击选中事件
	var selectDrawClickHand = function (el) {
		var flag = false,
				$s_select = $(el).find(".s_select");

		if ($s_select.hasClass("iconxuanzhong")){
			$s_select.removeClass("iconxuanzhong").addClass("iconiconfontxuanzhong4");
			flag = true;
		} else {
			$s_select.removeClass("iconiconfontxuanzhong4").addClass("iconxuanzhong");
			flag = false;
		}
		return flag;
	};

	// 判断多选是否选中
	var isMulSelect = function (el, str) {
		// 获取是否选中
		var $_select = $(el).find(str);
		if ($_select.hasClass("iconiconfontxuanzhong4")){
			// console.log("移除选中！");
			$_select.removeClass("iconiconfontxuanzhong4").addClass("iconxuanzhong")
			return true;
		}
		return false;
	};

	// 判断选中操作
	var selectOpt = function (el) {
		// 获取循环编号
		var n_ = $(el).attr("attr_num");
		// 获取id
		var id_ = $(el).attr("attr_id");
		// console.log($(el).attr("attr_id"));
		switch (id_) {
			case "1":
				signHand(el, id_, n_);
				break;
			case "2":
				signHand(el, id_, n_);
				break;
			case "3":
				signHand(el, id_, n_);
				break;
			case "4":
				physicalsHand(el);
				break;
			case "5":
				visitsHand(el);
				break;
			case "10":
				drugHand(el);
				// matchHashHand(el);
				break;
			case "11":
				familyDoctorHand(el);
				break;
			case "12":
				vaccHand(el);
				break;
			default:
				otherHand(el);
		}
	};

	// 选中事件
	var selectHand = function (el) {
		$(el).removeClass("iconxuanzhong").addClass("iconiconfontxuanzhong4");
	};

	// 取消选中事件
	var removeSelectHand = function (el) {
		$(el).removeClass("iconiconfontxuanzhong4").addClass("iconxuanzhong");
	};

	// 选中其他项操作
	var otherHand = function (el) {
		// console.log(el);
		var sale_list = data.cacheCustoms.sale_list;
		// 获取循环编号和id
		var n = $(el).attr("attr_num"),
				id = $(el).attr("attr_id");
		// 获取是取消选中
		if (isMulSelect(el, ".p_select")) {
			// 清空价格
			// global.price.remove(data.cacheCustoms.sale_list[n].price);
			delete global.price[id];
			// 移除取消选中项
			delete global.data.selectArr[id];
			// 计算总价
			totalPrice();
			return;
		};

		// 获取价格
		global.price[id] = data.cacheCustoms.sale_list[n].price;
		// 选中该项
		selectHand($("#cp_"+id).find(".p_select"));

		// 拷贝数据
		var selectArr = deepClone(sale_list[n]);
		// 清空子数据
		selectArr.children = {};
		// 存储数据
		global.data.selectArr[id] = selectArr;

		// 计算总价
		totalPrice();

	};

	// 家庭医生事件
	var familyDoctorHand = function (el) {
		// console.log("家庭医生事件");
		var sale_list = data.cacheCustoms.sale_list;
		// 获取循环编号和id
		var n = $(el).attr("attr_num"),
			id = $(el).attr("attr_id");
		// 获取是取消选中
		if (isMulSelect(el, ".p_select")) {
			// 清空价格
			// global.price.remove(data.cacheCustoms.sale_list[n].price);
			delete global.price[id];
			// 移除取消选中项
			delete global.data.selectArr[id];
			// 计算总价
			totalPrice();
			return;
		};

		// 获取价格
		global.price[id] = data.cacheCustoms.sale_list[n].price;
		// 选中该项
		selectHand($("#cp_"+id).find(".p_select"));
		// 拷贝数据
		var selectArr = deepClone(sale_list[n]);
		// 清空子数据
		selectArr.children = {};
		// 存储数据
		global.data.selectArr[id] = selectArr;

		// 计算总价
		totalPrice();
	};

	// 出入境登记事件
	var signHand = function (el, id, n) {
		// console.log("选择预约关联登记");
		// console.log(data.cacheCustoms);
		// 获取循环编号
		var n_ = $(el).attr("attr_num");
		// 获取id
		var id_ = $(el).attr("attr_id");
		// 获取是取消选中
		if (isMulSelect(el, ".p_select")) {
			// 清空价格
			// global.price.vacc = 0;
			// global.price.remove(data.cacheCustoms.sale_list[n].price);
			delete global.price[id];
			// 移除取消选中项
			delete global.data.selectArr[id];
			// 计算总价
			totalPrice();
			// 移除关联登记信息
			$(".related_sign").text("");
			return;
		};

		console.log(data.cacheCustoms.application_complete_unregistered);
		// 获取登记信息
		var signData = global.application_complete_unregistered;
		// 判断是否登记
		if (signData.is_go_to_application_directly){
			// global.application_related = data.cacheCustoms.is_application_related;
			console.log(signData.string);
			console.log(signData.application_url);
			// alert(signData.string);
			// 需要配置跳转去登记页面
			var signTip = confirm(signData.string);
			// 用户没有登记跳出执行
			if (!signTip) return;
			// 跳转到登记
			location.href = signData.application_url;
		} else if (id == 3){
			// 3是入境，获取入境信息
			// var entryArr = signData.list_for_entry;
			loadSignInfo(signData.list_for_entry, signData, id, n, signData.copy_info_for_entry);
		} else {
			// 1或2是出境，获取出境信息
			// var entryArr = signData.list_for_exit;
			loadSignInfo(signData.list_for_exit, signData, id, n, signData.copy_info_for_exit);
		}
	};
	// 根据选项匹配登记信息
	var loadSignInfo = function (d, signData, id, n, copyD) {
		console.log(d);
		console.log(signData);
		// 判断登记信息是否存在
		if (isEmptyObj(d)){
			// 储存拷贝登记标识
			global.identifier = signData.exit_and_entry_application_for_copy;
			// 载入修改出入境信息
			loadDraw(tpl.signUpdate, copyD, function (el) {
				// 更改弹出层标题
				el.find(".dw_h_name").text(copyD.title);
				// 绑定事件
				bindSignUpdateHand(el, signData.is_application_related_string, id, n);
			}, n, id);
		} else {
			// 判断已关联登记，不显示登记选择
			if (global.is_application_related) {
				// 更新页面显示状态
				$(".related_sign").text(signData.is_application_related_string);
				// 选中套餐
				// selectHand($("#cp_" + id).find(".p_select"));
				// 选中当前项目，取消其他项目登记关联
				onlySelectOpt(id, n);
				// 获取价格
				global.price[id] = data.cacheCustoms.sale_list[n].price;
				// 计算总价
				totalPrice();
				// 退出不载入登记记录
				return;
			};
			// 载入登记记录
			loadDraw(tpl.signList, d, function (el) {
				// 绑定事件
				bindSignHand(el, signData.is_application_related_string, d, id, n);
			});
		}

	};
	// 绑定修改出入境信息事件
	var bindSignUpdateHand = function (el, txt, id, n) {
		// 获取登记列表
		var $destination = $("#destination"),							// 目的地
			$duration = $("#duration"),										// 停留时间
			$EntryorExit_id = $("#EntryorExit_id"),				// 出入境id
			$confirm = el.find(".confirm");						// 页面文字信息展示
		// 绑定确认修改事件
		$confirm.click(function () {
			if (global.isflag) return;
			copy_application(el, txt, id, n);
		});

		// 绑定目的地输入事件
		$destination.bind('input propertychange', function () {
			// 验证非法输入
			checkIllegalInput(this);
		});
		// 绑定停留时间输入事件
		$duration.bind('input propertychange', function () {
			// 验证非法输入
			checkIllegalInput(this);
		});
	};
	// 修改登记出入境验证
	var checkSignUpdate = function () {
		// 获取页面输入值
		var destination = $("#destination").val(),							// 目的地
			duration = $("#duration").val(),										// 停留时间
			EntryorExit_id = $("#EntryorExit_id").val(),				// 出入境id
			flag = true;
		// 判断是否输入目的地
		if (!destination) {
			alert("请输入目的地~");
			flag = false;
			return flag;
		}
		// 判断是否输入停留时间
		if (!duration) {
			alert("请输入停留时间~");
			flag = false;
			return flag;
		}
		// 判断通过验证进行赋值
		if (flag) {
			// 配置页面输入参数
			global.signUpdateInfo.destination = destination;
			global.signUpdateInfo.duration = duration;
			global.signUpdateInfo.is_EntryorExit = EntryorExit_id;
			// 固定值配置
			global.signUpdateInfo.application_form_context_identifier = global.identifier;
			global.signUpdateInfo.user_id = global.userId;
		}
		return flag;
	};
	// 绑定登记列表点击事件
	var bindSignHand = function (el, txt, d, id, n) {
		// 获取登记列表
		var $s_sign = el.find("li"),				// 登记列表
				$related_sign = $(".related_sign");		// 页面文字信息展示
		// 绑定点击事件
		$s_sign.click(function () {
			// 获取登记id和循环编号
			var id_ = this.getAttribute("data-id");
			// console.log(id_);
			// console.log(d);
			// 存储选中登记信息
			global.data.application_complete_unregistered = d[id_];
			// console.log(global.data.application_complete_unregistered);
			// 更新页面显示状态
			$related_sign.text(txt);
			// 关闭弹出层
			el.remove();
			// 选中当前项目，取消其他项目登记关联
			onlySelectOpt(id, n);
			// 选中套餐
			// selectHand($("#cp_" + id).find(".p_select"));
			// 计算总价
			totalPrice();

		});

	};
	// 判断关联登记只能选中一个项目
	var onlySelectOpt = function (id, n) {
		var sale_list = data.cacheCustoms.sale_list;
		// 判断关联登记只能选中一个
		var k=0, len=data.signArr.length;
		for (; k<len; k++) {
			var signId = data.signArr[k];
			if (signId == id){
				// 选中套餐
				selectHand($("#cp_" + signId).find(".p_select"));
				// 存储选中信息
				// global.data.selectArr.push(sale_list[k]);
				global.data.selectArr[signId] = sale_list[k];
				// 获取价格
				// global.signPrice = sale_list[n].price;
				global.price[signId] = sale_list[n].price;
			} else {
				// 取消选中套餐
				removeSelectHand($("#cp_" + signId).find(".p_select"));
				// 删除选中信息
				// global.data.selectArr.remove(sale_list[k]);
				delete global.data.selectArr[signId];
				// 获取价格
				// global.price.remove(sale_list[n].price);
				delete global.price[signId];
			}
		}
	};

	// 预约时间事件
	var timeHand = function (id) {
		// console.log("预约时间事件");
		// console.log(data.cacheCustoms.register_list.date);
		// 获取预约时间数据
		var timeData = data.cacheCustoms.register_list.date;
		// 载入预约时间
		loadDraw(tpl.timeList, timeData, function (el) {
			// 绑定事件
			bindTimeHand(el, timeData, id);
		});
	};
	// 绑定登记列表点击事件
	var bindTimeHand = function (el, d, id) {
		// 获取登记列表
		var $s_sign = el.find("li"),				// 登记列表
			$related_sign = $(".related_sign");		// 页面文字信息展示
		// 绑定点击事件
		$s_sign.click(function () {
			// 获取登记id和循环编号
			var n = this.getAttribute("data-id");
			// console.log(n);
			// console.log(d);
			// 存储选中登记信息
			global.data.timeArr = d[n];
			// console.log(global.data.timeArr);
			console.log(global.data);
			// 提交预约
			submitExamine(id);
			// 关闭弹出层
			el.remove();
		});

	};

	// 选择接种疫苗
	var vaccHand = function (el) {
		// console.log("选择接种疫苗");
		// 获取数据编号
		var n = $(el).attr("attr_num");
		// 获取id
		var _id = $(el).attr("attr_id");
		// 获取是取消选中
		if (isMulSelect(el, ".p_select")) {
			// 清空价格
			delete global.price[_id];
			// 清空疫苗数组
			global.data.vaccArr = [];
			// 移除取消选中项
			delete global.data.selectArr[_id];
			// 更新自选药价格
			$("#cp_"+_id).find(".p_price").html("");
			// 计算总价
			totalPrice();
			return;
		};
		// 载入疫苗页面
		loadDraw(tpl.vacc, data.cacheCustoms.sale_list[n].children, function (el) {
			// 勾选已选中项
			for (var k in global.data.vaccArr){
				// 选中已选中项
				selectHand($(".select_list").find("[attr_id='"+ k +"']"));
			}

			// 显示弹出
			el.show();

			// 绑定事件
			bindDrawEvent(el, vaccOpt);

		}, n, _id, sureVaccHand, cancelVaccHand);

	};
	// 疫苗确认事件
	var sureVaccHand = function (el, obj, n, id) {
		// console.log("sureVaccHand");
		var sale_list = data.cacheCustoms.sale_list;

		// var sale_list = Object.assign({}, data.cacheCustoms.sale_list);
		// 获取所有选中项
		var $p_select = el.find(".iconiconfontxuanzhong4"), vaccPrice = 0, selectArr = [];
			// global.data.vaccArr = [];
		// 遍历选中项获取数据
		$p_select.each(function (index, Element) {
			// 存储数据
			global.data.vaccArr.push(obj.opts.data[$(this).attr("attr_id")]);
			vaccPrice += parseFloat(obj.opts.data[$(this).attr("attr_id")].price);
		});
		// console.log(global.data.vaccArr);
		// console.log(vaccPrice);
		// 页面赋值价格
		if (global.data.vaccArr.length > 0){
				// global.vaccPrice = vaccPrice.toString();
				// global.price.push(global.vaccPrice);
			global.price[id] = vaccPrice.toString();
			// 疫苗价格
			$("#cp_"+id).find(".p_price").html("<em>￥</em>"+vaccPrice.toFixed(2));
			// 选中该项
			selectHand($("#cp_"+id).find(".p_select"));
			// 拷贝数据
			var selectArr = deepClone(sale_list[n]);
			// 清空子数据
			selectArr.children = {};
			// 存储数据
			global.data.selectArr[id] = selectArr;
		} else {
			alert("请选择接种疫苗~");
			return;
		}
		// 计算总价
		totalPrice();
		// 销毁弹出层
		obj.destroyDraw(el);
	};
	// 疫苗取消事件
	var cancelVaccHand = function (el) {
		// console.log("cancelVaccHand");

	};
	// 疫苗选中操作
	var vaccOpt = function (flag) {
		if (flag) {
			// console.log("选中");
		} else {
			// console.log("取消选中");
		}
	};

	// 选择体检项目
	var physicalsHand = function (el) {
		console.log("选择体检项目");
		// 获取数据编号
		var n = $(el).attr("attr_num");
		// 获取id
		var _id = $(el).attr("attr_id");
		// 获取是取消选中
		if (isMulSelect(el, ".p_select")) {
			// 清空价格
			delete global.price[_id];
			// 清空体检项目数组
			global.data.physicalsArr = [];
			// 移除取消选中项
			delete global.data.selectArr[_id];
			// 更新自选药价格
			$("#cp_"+_id).find(".p_price").html("");
			// 计算总价
			totalPrice();
			return;
		};

		console.log(data.cacheCustoms.sale_list[n]);
		// 载入疫苗页面
		loadDraw(tpl.physicalsList, data.cacheCustoms.sale_list[n], function (el) {

			// 绑定事件
			bindDrawEvent(el, physicalOpt);
			// 绑定类别匹配事件
			$(".select_list_category dt").click(sortOpt);

		}, n, _id, surePhysicalsHand, cancelPhysicalsHand);
	};
	// 深度体检确认事件
	var surePhysicalsHand = function (el, obj, n, id) {
		// console.log("sureVaccHand");
		var sale_list = data.cacheCustoms.sale_list;

		// var sale_list = Object.assign({}, data.cacheCustoms.sale_list);
		// 获取所有选中项
		var $p_select = el.find(".iconiconfontxuanzhong4"), physicalsPrice = 0, selectArr = [];
		// global.data.vaccArr = [];
		// 遍历选中项获取数据
		$p_select.each(function (index, Element) {
			// 存储数据
			global.data.physicalsArr.push(obj.opts.data.children[$(this).attr("attr_id")]);
			physicalsPrice += parseFloat(obj.opts.data.children[$(this).attr("attr_id")].price);
		});
		// console.log(global.data.vaccArr);
		// console.log(physicalsPrice);
		// 页面赋值价格
		if (global.data.physicalsArr.length > 0){
			global.price[id] = physicalsPrice.toString();
			// 疫苗价格
			$("#cp_"+id).find(".p_price").html("<em>￥</em>"+physicalsPrice.toFixed(2));
			// 选中该项
			selectHand($("#cp_"+id).find(".p_select"));
			// 拷贝数据
			var selectArr = deepClone(sale_list[n]);
			// 清空子数据
			selectArr.children = {};
			// 存储数据
			global.data.selectArr[id] = selectArr;
		} else {
			alert("请选择体检项目~");
			return;
		}
		// 计算总价
		totalPrice();
		// 销毁弹出层
		obj.destroyDraw(el);
	};
	// 深度体检取消事件
	var cancelPhysicalsHand = function (el) {
		// console.log("cancelVaccHand");

	};
	// 深度体检选中操作
	var physicalOpt = function (flag) {
		if (flag) {
			// console.log("选中");
		} else {
			// console.log("取消选中");
		}
	};
	// 类别匹配操作
	var sortOpt = function () {
		// 获取类别
		var cur_Sort = $(this).attr("attr_sort");
		console.log(cur_Sort);
		// 选中当前项，移除其他项
		$(this).addClass("cur").siblings().removeClass("cur");
		// 隐藏所有项
		$("[attr_sex]").hide();
		// 判断选中类别并显示
		if (cur_Sort === "MALE"){
			$("[attr_sex='MALE']").show();
		} else if (cur_Sort === "FEMALE"){
			$("[attr_sex='FEMALE']").show();
		} else {
			$("[attr_sex]").show();
		}

	};

	// 请选择陪诊时间
	var visitsHand = function (el) {
		// console.log("请选择陪诊时间");
		// 获取数据编号
		var n = $(el).attr("attr_num");
		// 获取id
		var _id = $(el).attr("attr_id");
		// 获取陪诊数据
		var visitsData = data.cacheCustoms.sale_list[n];
		// console.log(visitsData);
		// 获取是取消选中
		if (isMulSelect(el, ".p_select")) {
			// 清空价格
			delete global.price[_id];
			// 清空陪诊数组
			global.data.visitsInfo = {};
			// 移除取消选中项
			delete global.data.selectArr[_id];
			// 更新自选药价格
			$("#cp_"+_id).find(".p_price").html("");
			// 计算总价
			totalPrice();
			return;
		};
		// 载入陪诊选项
		loadDraw(tpl.visitsList, visitsData, function (el) {
			// 绑定事件
			bindVisitsEvent(el, visitsData);
			// 绑定类别匹配事件
			// $(".select_list_category dt").click(sortOpt);
		}, n, _id, sureVisitsHand, cancelVisitsHand);

	};
	// 绑定弹出层点击事件
	var bindVisitsEvent = function (el, d) {
		// 获取元素
		var $p_select = el.find("li");
		// 获取默认值id
		var def_id = $p_select.eq(0).attr("data-id");
		// 获取时间范围
		var visitsTime = d.accompany_duration_minandmax;

		// 绑定点击多选选中事件
		$p_select.click(function () {
			// 当前状态设为选中
			$(this).find(".s_select").removeClass("iconxuanzhong").addClass("iconiconfontxuanzhong4");
			// 取消其他项选中状态
			$(this).siblings().find(".s_select").removeClass("iconiconfontxuanzhong4").addClass("iconxuanzhong");
			// 获取陪诊id
			var _id = $(this).attr("data-id");
			// 更新陪诊信息
			global.data.visitsInfo.cont = d.children[_id];
			// console.log(global.data.visitsInfo);
		});
		// 绑定数量事件
		quantity(document.getElementsByClassName("visit_count"), {
			isTpl: false,
			minNum: visitsTime.min,
			maxNum: visitsTime.max,
			addHandle: function (el, v) {
				el.value = v + "小时";
				global.data.visitsInfo.time = v;
			},
			cutHandle: function (el, v) {
				el.value = v + "小时";
				global.data.visitsInfo.time = v;
			},
		});

	};
	// 陪诊时间确认事件
	var sureVisitsHand = function (el, obj, n, id, d) {
		// console.log("sureVaccHand");
		var sale_list = data.cacheCustoms.sale_list;
		// 获取元素
		var $p_select = el.find("li");
		// 获取默认值id
		var def_id = $p_select.eq(0).attr("data-id");
		// 判断陪诊信息是否存在
		if (!global.data.visitsInfo.cont){
			// 获取默认陪诊信息
			global.data.visitsInfo.cont = d.children[def_id];
		}
		if (!global.data.visitsInfo.time){
			// 获取默认陪诊时间
			global.data.visitsInfo.time = d.accompany_duration_minandmax.min;
		}
		// console.log(global.data.visitsInfo);
		// 获取价格和时间
		var visitsPrice, _t = global.data.visitsInfo.time,
			_price = global.data.visitsInfo.cont.price;
		// console.log(_t, _price);
		// 计算价格
		visitsPrice = _t*_price;
		// console.log(visitsPrice);

		// 页面赋值价格
		global.price[id] = visitsPrice.toString();
		// 陪诊价格
		$("#cp_"+id).find(".p_price").html("<em>￥</em>"+visitsPrice.toFixed(2));
		// 选中该项
		selectHand($("#cp_"+id).find(".p_select"));
		// 拷贝数据
		var selectArr = deepClone(sale_list[n]);
		// 清空子数据
		selectArr.children = {};
		// 存储数据
		global.data.selectArr[id] = selectArr;
		// 计算总价
		totalPrice();
		// 销毁弹出层
		obj.destroyDraw(el);
	};
	// 陪诊时间取消事件
	var cancelVisitsHand = function (el) {
		// console.log("cancelVaccHand");

	};
	// 陪诊时间选中操作
	var visitsOpt = function (flag) {
		if (flag) {
			// console.log("选中");
		} else {
			// console.log("取消选中");
		}
	};

	// 通过HASH匹配药品列表
	var matchHashHand = function (el) {
		// 设置hash跳转和回调方法
		hashUrl("drug", function (url) {
			// 存储旧的URL
			global.oldUrl = url;
			drugHand(el);
		});
	};
	// 药品列表
	var drugHand = function (el) {
		// console.log("药品列表");
		// 获取数据编号
		var n = $(el).attr("attr_num");
		// 获取id
		var _id = $(el).attr("attr_id");
		// 获取是取消选中
		if (isMulSelect(el, ".p_select")) {
			// 清空价格
			delete global.price[_id];
			// 清空陪诊数组
			// global.data.drugInfo = {};
			// 更新自选药价格
			$("#cp_"+_id).find(".p_price").html("");
			// 移除取消选中项
			delete global.data.selectArr[_id];
			// 计算总价
			totalPrice();
			return;
		};
		// 设置hash跳转和回调方法
		// 设置hash跳转
		// window.location.hash = "drug";
		// alert(location.hash);
		// 储存旧的url
		global.oldUrl = location.href;
		// alert("oldUrl", global.oldUrl);
		// 把当前url添加到历史记录
		history.pushState(null, null, location.href + "#hash");
		// alert(location.hash);
		// 载入药品列表
		loadDrug(tpl.drug, data.cacheCustoms.sale_list[n].children);

		// 绑定事件
		bindDrugEvent(data.cacheCustoms.sale_list[n], _id);

	};
	// 绑定药品列表点击事件
	var bindDrugEvent = function (d, id) {
		var $cat = $(".d_category").find("[data-v]"),		// 获取药品分类
			$drug_list = $(".d_list li"),		// 药品列表
			$drug_cart = $("#drug_cart"),		// 药品购物车
			$sure_drug = $("#sure_drug");		// 确认购物
		console.log(d.children);
		// 获取自选记录
		global.data.drugInfo = d.children.shop_cart;
		// 有自选记录时，更新药品数量
		if (!isEmptyObj(global.data.drugInfo.data)){
			setDrugListNum(d.children);
		}
		// 判断自选记录是否存在
		// if (isEmptyObj(global.data.drugInfo)){
		// 	global.data.drugInfo = {};
		// }
		console.log(global.data.drugInfo);
		// 触发数量加减插件
		quantity(document.getElementsByClassName("quantity_count"), {
			isTpl: false,
			minNum: 0,
			maxNum: 999,
			addHandle: function (el, v, cutEl) {
				// el.value = v + "小时";
				// console.log(cutEl);
				// 显示减号按钮
				cutEl.style.display = "block";
				// console.log(v);
				// 数量增加操作
				addDrugOpt(el, v, d.children, id);
			},
			cutHandle: function (el, v, cutEl) {
				// el.value = v + "小时";
				// 数量为0时，隐藏减号按钮
				if (v == 0){
					// 隐藏减号按钮
					cutEl.style.display = "none";
					// 输入框值为空
					el.value = "";
				}
				// 数量减少操作
				cutDrugOpt(el, v, d.children, id);
			}
		});

		// 药品类别点击事件
		$cat.click(function () {
			// 获取分类id
			var _id = $(this).attr("data-v");
			// 选中点击分类, 取消其他选中
			$(this).addClass("cur").siblings().removeClass("cur");
			// 滑动到分类对应药品列表
			$('.v_'+_id)[0].scrollIntoView(true);
		});
		// 药品购物车点击事件
		$drug_cart.click(function () {
			console.log("药品购物车点击事件");
			// 判断购物车没有商品，不触发自选记录
			if (isEmptyObj(global.data.drugInfo.data)){
				return;
			}
			// 判断自选记录已经显示
			if (global.recordEl){
				global.recordEl.remove();		// 移除自选记录
				global.recordEl = "";				// 清除自选记录标识
				return;
			}
			// console.log(data.drugArr);
			drugCartHand(global.data.drugInfo, d.children.shop_cart);
		});

		// 确认点击事件
		$sure_drug.click(function () {
			// 判断没有自选记录，不请求接口
			if (isEmptyObj(global.data.drugInfo.data)){
				alert("请选择药品！");
				// $(".drug").remove();
				return;
			}
			// 判断自选记录已经显示
			if (global.recordEl){
				global.recordEl.remove();		// 移除自选记录
				global.recordEl = "";				// 清除自选记录标识
			}
			// 请求同步自选记录接口
			customs_shop_cart(global.data.drugInfo);
			// 确认购物操作
			drugSureHand(global.data.drugInfo, id, d);
		});

		return;
		// 药品点击事件
		$drug_list.click(function () {
			// 获取药品id和类别
			var drug_n = $(this).attr("data-v"),
				cat_n = $(this).attr("data-cat");
			// 存储数据
			d.drug[cat_n].goods_list[drug_n].num = 1;
			data.drugArr.total_num = d.drug[cat_n].goods_list[drug_n].num;
			data.drugArr.total_price = d.drug[cat_n].goods_list[drug_n].price * d.drug[cat_n].goods_list[drug_n].num;
			data.drugArr.data.push(d.drug[cat_n].goods_list[drug_n]);
			console.log(data.drugArr);
			// 赋值数量和价格
			setShopCartHtml(data.drugArr);
		});

	};
	// 更新药品列表数量（多个同时更新）
	var setDrugListNum = function (d) {
		// console.log(d);
		// 获取购物车信息和药品列表信息
		var shopCat = d.shop_cart.data,
			drugList = d.drug;
		// 遍历自选药品
		for (var i in shopCat){
			// console.log(d[i]);
			// 更新指定药品数量
			setDrugNum(shopCat[i], i);
		}
	};
	// 更新指定药品数量
	var setDrugNum = function (obj, id) {
		// 更新匹配药品列表
		$(".drug_"+id).find(".text_change").val(obj.num);		// 设置数量
		$(".drug_"+id).find(".cut").show();									// 显示减号操作
		// 判断药品数量为0操作
		if (obj.num == 0){
			// 隐藏减号按钮
			$(".drug_"+id).find(".cut").hide();
			// 输入框值为空
			$(".drug_"+id).find(".text_change").val("");
		}
		// 更新药品数量
		// drugList[i].num = shopCat[i].num;
	};
	// 药品加入购物车减少数量操作
	var cutDrugOpt = function (el, v, d, id) {
		// 获取当前药品信息
		var drugArr = d.drug,
			$drug = $(el).parents("li"),	// 当前药品
			id_ = $drug.attr("data-v"),			// 药品id
			cat = $drug.attr("data-cat");		// 药品分类
		// console.log(0, $drug, 1, id_, 2, cat, 3, d, 4, v, 5, el);
		// 更新购物总数
		global.data.drugInfo.total_num -= 1;
		var n = global.data.drugInfo.total_num;
		// 获取药品价格
		var drugPrice = drugArr[cat].goods_list[id_].price;
		// 更新总价
		global.data.drugInfo.total_price = (parseFloat(global.data.drugInfo.total_price) - parseFloat(drugPrice)).toFixed(2);
		// 更新药品数量
		drugArr[cat].goods_list[id_].num = v;
		// 更新购物车信息(已存在该商品可以不更新)
		// global.data.drugInfo.data[id_] = drugArr[cat].goods_list[id_];
		// console.log(global.data.drugInfo.data[id_]);
		console.log(global.data.drugInfo);
		// 赋值数量和价格
		setShopCartHtml(global.data.drugInfo);
	};
	// 药品加入购物车增加数量操作
	var addDrugOpt = function (el, v, d, id) {
		// 获取当前药品信息
		var drugArr = d.drug,
			$drug = $(el).parents("li"),	// 当前药品
			id_ = $drug.attr("data-v"),			// 药品id
			cat = $drug.attr("data-cat");		// 药品分类
		// console.log(0, $drug, 1, id_, 2, cat, 3, d, 4, v, 5, el);
		// 更新购物总数
		global.data.drugInfo.total_num += 1;
		var n = global.data.drugInfo.total_num;
		// 获取药品价格
		var drugPrice = drugArr[cat].goods_list[id_].price;
		// 更新总价
		global.data.drugInfo.total_price = (parseFloat(drugPrice)+parseFloat(global.data.drugInfo.total_price)).toFixed(2);
		// 更新药品数量
		drugArr[cat].goods_list[id_].num = v;
		// 更新购物车信息
		global.data.drugInfo.data[id_] = drugArr[cat].goods_list[id_];
		// 判断是不是第一次添加,第一次添加新增药品信息，否则购车增加数量
		if (v == 1){
			// 拷贝数据
			var newDrugArr = deepClone(drugArr[cat].goods_list[id_]);
			// 更新购物车药品
			// global.data.drugInfo.drugArr.push(drugArr[cat].goods_list[id_]);
			// global.data.drugInfo.data[id_] = drugArr[cat].goods_list[id_];

		} else if (v > 1) {
			// 更新购物车药品
			// global.data.drugInfo.drugArr.push(drugArr[cat].goods_list[id_]);
			// global.data.drugInfo.data[id_] = drugArr[cat].goods_list[id_];
			// global.data.drugInfo.data[id_].num = drugArr[cat].goods_list[id_];
		}
		// console.log(drugArr[cat].goods_list[id_]);
		// console.log(global.data.drugInfo.data[id_]);
		console.log(global.data.drugInfo);
		// 赋值数量和价格
		setShopCartHtml(global.data.drugInfo);
	};
	// 设置页面数量和总价
	var setShopCartHtml = function (d) {
		$("#cart_count").text(d.total_num);
		$("#total_price").html("<em>￥</em>" + d.total_price);
	};
	// 药品购物车点击事件
	var drugCartHand = function (d, catData) {
		console.log(d, catData);
		// 配置插件参数
		var obj = {
			tpl: tpl.card_record,
			data: d.data,
			maskClose: true,
			onCancel: function () {
				console.log("阴影关闭");
				// 判断自选记录已经显示
				if (global.recordEl){
					global.recordEl = "";				// 清除自选记录标识
				}
			}
		};
		// 载入自选记录页面
		loadBaseDraw(obj, function (el) {
			global.recordEl = el;
			// console.log(global.recordEl);
			// 变更自选记录样式
			$(el).css("bottom", "2.2rem");
			// 添加class，设置样式
			// $(el).addClass("r_box_shadow");
			// 获取清空自选记录按钮
			var $clearRecord = $(el).find(".clear_record");
			// 绑定清除记录事件
			$clearRecord.click(function () {
				// 判断购物车
				// 请求清空自选记录接口
				clear_shop_cart(el, d);
			});
			// 触发数量加减插件
			quantity(document.getElementsByClassName("r_quantity"), {
				isTpl: false,
				minNum: 0,
				maxNum: 999,
				addHandle: function (el, v, cutEl) {
					// 数量增加操作
					addDrugCartOpt(el, v, d);
				},
				cutHandle: function (el, v, cutEl) {
					// 数量减少操作
					cutDrugCartOpt(el, v, d);
				}
			});
		});
	};
	// 自选记录药品减少数量操作
	var cutDrugCartOpt = function (el, v, d, id) {
		// 获取当前药品信息
		var drugArr = d.drug,
			$drug = $(el).parents("li"),	// 当前药品
			id_ = $drug.attr("data-v"),			// 药品id
			cat = $drug.attr("data-cat");		// 药品分类
		// 更新购物总数
		global.data.drugInfo.total_num -= 1;
		var n = global.data.drugInfo.total_num;
		// 获取药品价格
		var drugPrice = global.data.drugInfo.data[id_].price;
		// 更新总价
		global.data.drugInfo.total_price = (parseFloat(global.data.drugInfo.total_price) - parseFloat(drugPrice)).toFixed(2);
		// 更新药品数量
		global.data.drugInfo.data[id_].num -= 1;

		// 更新指定药品数量
		setDrugNum(global.data.drugInfo.data[id_], id_);

		// 判断数量为空，移除该商品
		if (v == 0){
			// 拷贝数据
			// newDrugArr = deepClone(drugArr[cat].goods_list[id_]);
			// 更新购物车药品数据
			// global.data.drugInfo.drugArr.push(drugArr[cat].goods_list[id_]);
			delete global.data.drugInfo.data[id_];
			// 移除购物车
			$drug.remove();
		}
		// console.log(global.data.drugInfo.data[id_]);
		console.log(global.data.drugInfo);
		// 判断购物车没有药品
		if (isEmptyObj(global.data.drugInfo.data) && global.recordEl){
			// console.log(global.recordEl);
			global.recordEl.remove();		// 移除自选记录
			global.recordEl = "";				// 清除自选记录标识
		}

		// 赋值数量和价格
		setShopCartHtml(global.data.drugInfo);
	};
	// 自选记录药品增加数量操作
	var addDrugCartOpt = function (el, v, d, id) {
		// 获取当前药品信息
		var drugArr = d.drug,
			$drug = $(el).parents("li"),	// 当前药品
			id_ = $drug.attr("data-v"),			// 药品id
			cat = $drug.attr("data-cat");		// 药品分类
		// 更新购物总数
		global.data.drugInfo.total_num += 1;
		var n = global.data.drugInfo.total_num;
		// 获取药品价格
		var drugPrice = global.data.drugInfo.data[id_].price;
		// 更新总价
		global.data.drugInfo.total_price = (parseFloat(drugPrice)+parseFloat(global.data.drugInfo.total_price)).toFixed(2);
		// 更新药品数量
		global.data.drugInfo.data[id_].num = v;
		// 更新指定药品数量
		setDrugNum(global.data.drugInfo.data[id_], id_);
		console.log(global.data.drugInfo);
		// 赋值数量和价格
		setShopCartHtml(global.data.drugInfo);
	};
	// 确认购物操作
	var drugSureHand = function (d, id, selectD) {
		console.log(d, id);
		$(".drug").remove();
		// 确认后计算价格，页面赋值
		// 更新药品价格
		global.price[id] = d.total_price.toString();
		// 自选药价格
		$("#cp_"+id).find(".p_price").html("<em>￥</em>"+global.price[id]);
		// 选中该项
		selectHand($("#cp_"+id).find(".p_select"));
		// 拷贝数据
		var selectArr = deepClone(selectD);
		// 清空子数据
		selectArr.children = {};
		// 存储数据
		global.data.selectArr[id] = selectArr;
		// 计算总价
		totalPrice();
		// 返回上一页
		history.back();
		// 清空Hash
		// window.location.hash = "";
		// alert(1, global.oldUrl);
		// history.replaceState(null, null, global.oldUrl);
		// alert(1, location.hash);
		// 判断是IOS添加历史记录
		// if (typeof ios_app != 'undefined' && ios_app) {
			// 清空药品历史
			// history.replaceState("", "", location.href);
		// }
	};

	/**
	 * 计算总价（统计price里所有价钱）
	 * */
	var totalPrice = function () {
		console.log(global.price);
		global.total = 0;
		// 计算价钱
		for (var i in global.price) {
			if (tool.isString(global.price[i])){
				global.total += parseFloat(global.price[i]);
			}
		}

		// 页面赋值
		$(".foot_info").html("<span>合计:</span><em>￥</em>"+global.total.toFixed(2));
	};

	/**
	 * 请求数据
	 * @param {Function} examine 		请求初始化信息
	 */

		// 请求预约信息接口
	var examine11 = function (id) {
			// console.log(11, getRequest());
			// console.log(22, getRequestParam("user_id"));
			// 请求方式
			ajax.config.type = "get";
			// 存储id和url
			global.userId = id;
			// global.siteUrl = url;
			// 请求URL
			ajax.config.url = ajax.reqUrl(data.examine, siteUrl);
			// ajax.config.url = '../../data/customs.json';
			// http://h.lk.cn/drugstore/tab:stock_adjust/adjust:output/act:del_document
			// 请求参数
			ajax.config.data = global.reqUrlInfo;
			console.log(ajax.config.data);
			// 请求数据
			ajax.reqDataApi(ajax.config,function (res) {
				console.log(res);
				if (res.ResultCode == 1) {
					// console.log(res.ResultDescription);
					// 缓存数据
					data.cacheCustoms = res.Result;
					// 载入预约
					loadCustoms(id);
					// alert(res.msg);
				} else {
					console.log(res.ResultDescription);
					// alert(res.msg);
				}
			});
		};

	// 请求预约信息接口
	var examine = function (id) {
			// console.log(11, getRequest());
			// console.log(22, getRequestParam("user_id"));
		// 判断是请求本地json数据，请求方式设置为GET
		if (data.examine.flag && ajax.isLocal()){
			// 请求方式
			ajax.config.type = "get";
		}
		// 存储id和url
		global.userId = id;
		// global.siteUrl = url;
		// 请求URL
		ajax.config.url = ajax.reqUrl(data.examine, siteUrl);
		// http://h.lk.cn/drugstore/tab:stock_adjust/adjust:output/act:del_document
		// 请求参数
		ajax.config.data = global.reqUrlInfo;
		console.log(ajax.config.data);
		// 请求数据
		ajax.reqDataApi(ajax.config,function (res) {
			console.log(res);
			if (res.ResultCode == 1) {
				// console.log(res.ResultDescription);
				// 判断是否有预约, 没有跳转预约
				if (res.Result.is_exist_unpaid_register_bill && !global.reqUrlInfo.is_upgrade_service) {
						// 提示有预约
						alert(res.Result.exist_unpaid_register_bill_notice);
						// 跳转到预约信息
						location.href = res.Result.exist_unpaid_register_bill_url;
				}

				// 缓存数据
				data.cacheCustoms = res.Result;
				// 储存登记信息
				global.data.application_complete_unregistered = res.Result.is_application_related_identifier_object;
				// 储存登记列表信息
				global.application_complete_unregistered = res.Result.application_complete_unregistered;
				// 存储关联登记标识
				global.is_application_related = res.Result.is_application_related;
				// 存储是否有预约标识
				global.register_bill = {
					billFlag: res.Result.is_exist_unpaid_register_bill, 		// 预约标识
					billUrl: res.Result.exist_unpaid_register_bill_url, 		// 预约地址
					billNotice: res.Result.exist_unpaid_register_bill_notice, 		// 有预约提示信息
				};
				// 载入预约
				loadCustoms(id);
				// alert(res.msg);
			} else {
				console.log(res.ResultDescription);
				// alert(res.msg);
			}
		});
	};

	// 请求更新登进出入境信息接口
	var copy_application = function (el, txt, id, n) {
		// 修改登记出入境验证
		if (!checkSignUpdate()) return;
		// 锁定提交
		global.isflag = true;
		// 请求URL
		ajax.config.url = ajax.reqUrl(data.copy_application, siteUrl);
		// http://h.lk.cn/drugstore/tab:stock_adjust/adjust:output/act:del_document
		// 请求参数
		ajax.config.data = global.signUpdateInfo;
		console.log(ajax.config.data);
		// 请求数据
		ajax.reqDataApi(ajax.config, function (res) {
			console.log(res);

			if (res.ResultCode == 1) {
				// 移除修改登记出入境信息
				el.remove();
				// 存储选中登记信息
				global.data.application_complete_unregistered = res.Result.application_info_for_register;
				// 更新登记列表信息
				global.application_complete_unregistered = res.Result.application_complete_unregistered_in_registration_sale_item;

				// console.log(global.data.application_complete_unregistered);
				// 更新页面显示状态
				$(".related_sign").text(txt);
				// 选中当前项目，取消其他项目登记关联
				onlySelectOpt(id, n);
				// 计算总价
				totalPrice();
			} else {
				console.log(res.ResultDescription);
				// alert(res.msg);
			}
		}, function () {
			global.isflag = false;
		}, function () {
			global.isflag = false;
		});
	};

	// 提交预约信息接口
	var submitExamine = function (id, el) {
		// 请求URL
		ajax.config.url = ajax.reqUrl(data.submitExamine, siteUrl);
		// http://h.lk.cn/drugstore/tab:stock_adjust/adjust:output/act:del_document
		// 拼接请求参数
		var _obj = {
			// 登录id
			user_id: id,
			// 海关体检
			sale_list: global.data.selectArr,
			// 疫苗信息
			vaccine: global.data.vaccArr,
			// 药品信息
			drugpackage: [],
			// 海关体检
			// healthexam_all: global.data.selectArr,
			// 深度体检
			deeplyexam: global.data.physicalsArr,
			// 家庭医生
			familydoctor: [],
			// 陪诊
			accompany: global.data.visitsInfo,
			// 登记信息
			application: global.data.application_complete_unregistered,
			// 预约时间
			register:  global.data.timeArr,
		};
		console.log(_obj);
		// 对象转字符串
		// ajax.config.data = JSON.stringify(_obj);
		ajax.config.data = {
			data: JSON.stringify(_obj)
		};
		// console.log(ajax.config.data);
		// return;
		// 禁用立即预约
		// global.isflag = true;
		// 提交立即预约，禁用按钮
		$(el).attr("disabled", "disabled");
		// console.log(global.isflag);
		// 请求数据
		ajax.reqDataApi(ajax.config,function (res) {
			console.log(res);
			if (res.ResultCode == 1) {
				console.log(res.ResultDescription);
				alert(res.ResultDescription);
				location.href = res.Result.pay_url;
			} else {
				console.log(res.ResultDescription);
				alert(res.ResultDescription);
			}
			// 启用立即预约
			// global.isflag = false;
			// 提交成功，启用按钮
			$(el).attr("disabled", "disabled");
		});
	};

	// 同步自选记录接口
	var customs_shop_cart = function (d) {
		// 请求URL
		ajax.config.url = ajax.reqUrl(data.shop_cart_batch, siteUrl);
		// http://h.lk.cn/drugstore/tab:stock_adjust/adjust:output/act:del_document
		console.log(d.data);
		// 请求参数
		ajax.config.data = {
			shop_cart: JSON.stringify(d.data)
		};
		console.log(ajax.config.data);
		// return;
		// 请求数据
		ajax.reqDataApi(ajax.config,function (res) {
			// console.log(res);
			if (res.res == 1) {
				console.log(res.msg);
			} else {
				console.log(res.msg);
			}
		});
	};

	// 清空自选记录接口
	var clear_shop_cart = function (el, d) {
		// 请求URL
		ajax.config.url = ajax.reqUrl(data.shop_cart_delall, siteUrl);
		// http://h.lk.cn/drugstore/tab:stock_adjust/adjust:output/act:del_document
		// 请求参数
		ajax.config.data = {
			// shop_cart: d.data
		};
		// console.log(ajax.config.data);
		// 请求数据
		ajax.reqDataApi(ajax.config,function (res) {
			// console.log(res);
			// 判断清空是否成功
			if (res.res === 1){
				console.log(res.msg);
			} else {
				console.log(res.msg);
			}
			// 移除自选记录
			$(el).remove();
			// 清除自选记录标识
			global.recordEl = "";
			// 更新药品列表
			$(".d_list").find(".text_change").val("");
			$(".d_list").find(".cut").hide();
			// 更新购物车数据
			d.total_num = 0;
			d.total_price = 0;
			d.data = {};
			console.log(global.data.drugInfo);
			// 清空总价和数量
			setShopCartHtml(d);

		});
	};

	// 绑定后退事件
	window.addEventListener("popstate", function(e){
		// alert("popstate", location.hash);
		// if (typeof ios_app != 'undefined' && ios_app) {
		// 	// history.go(-1);
		// }
		$(".drug").remove();
	}, false);

	/**
	 * 初始化方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var init = function (id) {
		// console.log("初始化！！！");
		// 获取地址栏参数, 并记录
		global.reqUrlInfo = getRequest();
		console.log(global.reqUrlInfo.is_upgrade_service);
		// 记录用户id
		global.reqUrlInfo.user_id = id;
		// console.log(global.reqUrlInfo);
		// _tpl = tpl;
		// header引入操作
		// header(null, null, function (el) {
		// 	// 回调方法
		// 	$(".wui_wrapper").css("top", "2.5rem");
		// });
		// debugger
		examine(id);
		// examine11(id);
	};

	// 提供外部调用的参数和方法
	return init;
}));
