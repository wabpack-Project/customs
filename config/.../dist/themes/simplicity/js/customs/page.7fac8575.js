webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === "object") {
        var mo = factory();
        mo.__esModule = true;
        mo["default"] = mo;
        module.exports = mo;
    } else {
        root.miniTpl = factory();
    }
})(this, function() {
    function render(content, data) {
        data = data || {};
        var list = [ 'var tpl = "";' ];
        var codeArr = transform(content);
        for (var i = 0, len = codeArr.length; i < len; i++) {
            var item = codeArr[i];
            if (item.type == 1) {
                list.push(item.txt);
            } else if (item.type == 2) {
                var txt = "tpl+=" + item.txt + ";";
                list.push(txt);
            } else {
                var txt = 'tpl+="' + item.txt.replace(/"/g, '\\"') + '";';
                list.push(txt);
            }
        }
        list.push("return tpl;");
        return new Function("data", list.join("\n"))(data);
    }
    function transform(content) {
        var arr = [];
        var reg = /<%([\s\S]*?)%>/g;
        var match;
        var nowIndex = 0;
        while (match = reg.exec(content)) {
            appendTxt(arr, content.substring(nowIndex, match.index));
            var item = {
                type: 1,
                txt: match[1]
            };
            if (match[1].substr(0, 1) == "=") {
                item.type = 2;
                item.txt = item.txt.substr(1);
            }
            arr.push(item);
            nowIndex = match.index + match[0].length;
        }
        appendTxt(arr, content.substr(nowIndex));
        return arr;
    }
    function appendTxt(list, content) {
        content = content.replace(/\r?\n/g, "\\n");
        list.push({
            txt: content
        });
    }
    return render;
});

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_customs_index_css__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_customs_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_customs_index_css__);
// <!-- 组件 -->
// import $ from "../vendors/jquery/jquery-1.10.2.min";
// import "../vendors/Js/Array.extension";
// import "../vendors/Js/tool";
// // import ajax from "../vendors/ajax/config";
// var ajax = require("../vendors/ajax/config");
// import miniTpl from "../vendors/mini-tpl/mini-tpl";
// import draw from "../vendors/drawer/drawer_m";
// import quantity from "../vendors/Quantity/quantityOpt";

// <!-- 业务 -->
// import examine from "./tpl";
// import examine from "./examine_event";
var examine = __webpack_require__(5).examine;
// 业务 css


// var imgSrc = require('../../images/customs/drugBox.png');
// console.log(imgSrc);
// var img = new Image();
// img.src = imgSrc;
// document.body.appendChild(img);
// $(".drug_box").src = imgSrc;


// 初始化触发业务
examine(userId);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vendors_Js_Array_extension__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vendors_Js_Array_extension___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__vendors_Js_Array_extension__);
/*
 * 业务依赖组件
 */
// import $ from "../vendors/jquery/jquery-1.10.2.min";
// JQ引用第一种方式
// var $ = require("../vendors/jquery/jquery-1.10.2.min");
// window.jQuery = $;
// window.$ = $;


// import "../vendors/Js/tool";
var tool = __webpack_require__(8);
// import ajax from "../vendors/ajax/config";
var ajax = __webpack_require__(9);
// import miniTpl from "../vendors/mini-tpl/mini-tpl";
var miniTpl = __webpack_require__(1);
// import draw from "../vendors/drawer/drawer_m";
var draw = __webpack_require__(10);
// import quantity from "../vendors/Quantity/quantityOpt";
var quantity = __webpack_require__(11);

// <!-- 模板-->
// import examine from "./tpl";
var tpl = __webpack_require__(12);
// 图片引用
// import '../../images/customs/drugBox.png';
var imgSrc = __webpack_require__(13);
// var imgBanner = require('../../images/customs/banner.jpg');
console.log(imgSrc);
// console.log(imgBanner);

/**
 * 业务逻辑
 *
 * */
(function (root, factory) {
	if (typeof define === 'function' && __webpack_require__(0)) {
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
		for (key in obj) {
			var data = {};//每次循环的时候，新建对象
			data.name = key;
			datas.push(data);
		}
		console.log(datas);
		return datas;
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
		examine: {
			reqUrl	: "2/lancare_customhouse_interface_Tianjin/api:examination_registration",
			reqDevUrl	: "2/lancare_customhouse_interface_Tianjin/api:examination_registration",
			reqJson : "../../src/data/customs.json",
			flag		: false
		},
		submitExamine: {
			reqUrl	: "2/lancare_customhouse_interface_Tianjin/api:add_purchase_sale_item",
			reqDevUrl	: "2/lancare_customhouse_interface_Tianjin/api:add_purchase_sale_item",
			reqJson : "../../src/data/customs.json",
			flag		: false
		},
		shop_cart_batch: {
			reqUrl	: "ajax_customs_shop_cart/act:batch",
			reqDevUrl	: "ajax_customs_shop_cart/act:batch",
			reqJson : "../../src/data/customs.json",
			flag		: false
		},
		shop_cart_delall: {
			reqUrl	: "ajax_customs_shop_cart/act:delall",
			reqDevUrl	: "ajax_customs_shop_cart/act:delall",
			reqJson : "../../src/data/customs.json",
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
			$p_drop = $(".p_drop"),
			$appointment = $("#appointment");

		// 绑定点击下拉事件
		$p_drop.click(dropClickHand);

		// 绑定点击选中事件
		$cp_select.click(selectClickHand);

		// 根据hash进行跳转
		if (location.hash.indexOf("drug") >= 0){
			// $cp_select.eq(5).click();
		}

		// 模拟点击
		// $cp_select.eq(5).click();

		// 绑定立即预约
		$appointment.click(function () {
			appointmentHand(id, $cp_select);
		});

		// 把当前url添加到历史记录
		history.pushState(null,null,location.href);
		// 绑定后退事件
		window.addEventListener("popstate", function(e){
			if (typeof ios_app != 'undefined' && ios_app) {
				history.go(-1);
			}
			$(".drug").remove();
		}, false);

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
	var appointmentHand = function (id, el) {
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
		submitExamine(id);

	};

	// 点击下拉事件
	var dropClickHand = function () {
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
	var selectClickHand = function () {
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
		// 获取选中id
		var _id = $(el).attr("attr_id");
		// console.log($(el).attr("attr_id"));
		switch (_id) {
			case "1":
				signHand(el);
				break;
			case "12":
				vaccHand(el);
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
			case "2":
				signHand(el);
				break;
			case "3":
				signHand(el);
				break;
			case "11":
				familyDoctorHand(el);
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
	var signHand = function (el) {
		// console.log("选择预约关联登记");
		// console.log(data.cacheCustoms);
		// 获取循环编号
		var n = $(el).attr("attr_num");
		// 获取id
		var id_ = $(el).attr("attr_id");
		// 获取是取消选中
		if (isMulSelect(el, ".p_select")) {
			// 清空价格
			// global.price.vacc = 0;
			// global.price.remove(data.cacheCustoms.sale_list[n].price);
			delete global.price[id_];
			// 移除取消选中项
			delete global.data.selectArr[id_];
			// 计算总价
			totalPrice();
			// 移除关联登记信息
			$(".related_sign").text("");
			return;
		};

		console.log(data.cacheCustoms.application_complete_unregistered);
		var signData = data.cacheCustoms.application_complete_unregistered;
		// 判断是否登记
		if (!signData.list){
			// global.application_related = data.cacheCustoms.is_application_related;
			console.log(signData.string);
			console.log(signData.application_url);
			alert(signData.string);
			// 需要配置跳转去登记页面

		} else {
			// 载入登记记录
			loadDraw(tpl.signList, signData.list, function (el) {
				// 绑定事件
				bindSignHand(el, signData.is_application_related_string, signData.list, id_, n);
			});
		}
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
		window.location.hash = "drug";
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
		// history.back();
		// 清空Hash
		// window.location.hash = "";
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
	var examine = function (id) {
		// 请求URL
		ajax.config.url = ajax.reqUrl(data.examine, siteUrl);
		// http://h.lk.cn/drugstore/tab:stock_adjust/adjust:output/act:del_document
		// 请求参数
		ajax.config.data = {
			user_id: id,
			application_form_context_identifier: ""
		};
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

	// 提交预约信息接口
	var submitExamine = function (id) {
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
		// 请求数据
		ajax.reqDataApi(ajax.config,function (res) {
			console.log(res);
			if (res.ResultCode == 1) {
				console.log(res.ResultDescription);
			} else {
				console.log(res.ResultDescription);
				// alert(res.msg);
			}
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

	/**
	 * 初始化方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var init = function (id) {
		// console.log("初始化！！！");
		// _tpl = tpl;
		examine(id);
	};

	// 提供外部调用的参数和方法
	return examine;
}));

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(6)(module)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.lc = factory();
	}
})(this, function() {
	/**
	 * 判断数据类型
	 * @param {Object} len 		Hash位数
	 * */
	var isObjFunc = function(type) {
		var _toString = Object.prototype.toString;
		return function() {
			return _toString.call(arguments[0]) === '[object ' + type + ']'
		}
	};

	// 判断是函数（方法）
	var isFunction = function() {
		return isObjFunc("Function")(arguments[0]);
	};

	// 判断是字符串
	var isString = function() {
		return isObjFunc("String")(arguments[0]);
	};

	// 判断是对象
	var isObject = function() {
		return isObjFunc("Object")(arguments[0]);
	};

	// 判断是jq对象
	var isJqObject = function (obj) {
		if (obj instanceof jQuery){
			return true;
		}
	};

	// 判断对象是否为空
	var isEmptyObj = function (obj) {
		if (JSON.stringify(obj) === "{}"){
			return true;
		}
		return false;
	};

	// 复制对象
	// Json序列化克隆对象
	var deepClone = function(obj){
		return JSON.parse(JSON.stringify(obj));
	};

	/**
	 * 判断数据类型
	 * @param {Object} len 		Hash位数
	 * */

	return {
		isString: isString,
	}
});





/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	if (true) {
		// AMD
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports === 'object') {
		// Node, CommonJS-like
		// es6 module , typescript
		var mo = factory();
		mo.__esModule = true;
		mo['default'] = mo;
		module.exports = mo;
	} else {
		// browser
		root.ajax = factory();
	}
}(this, function () {
	/**
	 * 项目基本参数
	 * */
	var global = {};

	/**
	 * 判断开发环境, 配置主域名domain和接口请求域名siteUrl
	 * @param {string} domain 	主域名
	 * @param {string} siteUrl 	请求域名
	 *
	 * */
	var isLocalhost = function(siteUrl, domain){
		// 初始化标记、获取当前 URL 的主域名
		var flag, hostname = location.hostname;
		// 判断全局变量是否存在domain和siteUrl
		if(typeof domain == 'undefined'){
			domain = "/";
		}
		if(typeof siteUrl == 'undefined'){
			siteUrl = "//www.lk.cn/";
		}
		// 判断是不是本地环境
		if (hostname.indexOf('localhost') != -1) {
			// 本地开发
			global.domain = domain;
			global.siteUrl = siteUrl;
			// console.log("本地开发");
			flag = true;
		} else {
			// 其他
			global.domain = domain;
			global.siteUrl = "/";
			// console.log("其他");
			flag = false;
		}
		// this.domain = global.domain;
		// console.log(global);
		return flag;
	};

	/**
	 * Ajax 基本参数配置
	 * @param {string} url 模板
	 * @param {string} type 模板
	 * @param {string} dataType 模板
	 * @param {Object} data 模板
	 *
	 * */
	var ajaxConfig = {
		url: '',
		type: 'POST',
		dataType: 'json',
		data: null,
	};

	/**
	 * AJAX统一请求接口（JQ）
	 * @param {Object} obj 			Ajax 请求参数
	 * @param {function} callback Ajax 请求回调函数
	 * */
	var reqDataApi = function (obj, callback) {
		$.ajax({
			url: obj.url,
			type: obj.type,
			dataType: obj.dataType,
			data: obj.data,
			success: function (res) {
				if (callback) {
					callback(res);
				}
			},
			error: function(XMLHttpRequest,textStatus,errorThrown){
				//通常情况下textStatus和errorThrown只有其中一个包含信息
				// this;    //调用本次ajax请求时传递的options参数
				// console.log(this);
				console.log(XMLHttpRequest);
			}
		});
	};

	/**
	 * AJAX函数封装（原生JS）
	 * @param {Object} obj 			Ajax 请求参数
	 * @param {function} callback Ajax 请求回调函数
	 * */
	var reqAjax = function (opts) {
		// 配置参数
		opts = {
			type	: (opts.type||'GET').toUpperCase(),	// ajax请求方式，GET和POST（必须大写，此处默认把小写转大写）
			url		: opts.url||"",
			async	: opts.async||true,
			data 	: opts.data||null,
			cache	: opts.cache||true,
			dataType		:	opts.dataType || "text",
			contentType	:	opts.contentType || "application/x-www-form-urlencoded",
			beforeSend	:	opts.beforeSend || function(){},
			complete		: opts.complete || function(){},
			success			:	opts.success || function(){},
			error				:	opts.error || function(){}
		};
		// 判断返回数据类型为Script时，cache为false
		if (opts.dataType === "Script"){
			opts.cache = false;
		}
		// 格式化参数
		opts.data = formatParams(opts.data);
		console.log(opts);

		//创建-第一步(创建XMLHttpRequest对象用于在后台与服务器交换数据)
		var xhr;
		//非IE6
		if(window.XMLHttpRequest){
			xhr=new XMLHttpRequest();
		}else{
			//ie6及其以下版本浏览器
			xhr=ActiveXObject('Microsoft.XMLHTTP');
		}

		//连接和发送-第二步(1.设置请求	2. 发送请求)
		if(opts.type=='GET'){
			// 判断是否存在请求参数
			if (opts.data){
				opts.url = opts.url + "?" + formatParams(opts.data);
			}
			xhr.open(opts.type, opts.url, opts.async);
			xhr.send(null);
		}else if(opts.type=='POST'){
			opts.data = formatParams(opts.data);
			xhr.open(opts.type, opts.url, opts.async);
			//设置表单提交时的内容类型
			xhr.setRequestHeader("Content-Type", opts.contentType);

			xhr.send(opts.data);
		}
		// onload 事件绑定函数
		/*
		xhr.onload = function(){
			//输出一下请求返回的文本
			console.log("onload", this.responseText);
		}
		*/
		// readystatechange 事件绑定函数
		xhr.onreadystatechange = function () {
			// 判断请求是否完成(readyState == 4说明请求已完成)
			//
			if ((xhr.readyState == 4 && xhr.status == 200) || xhr.status == 304) {
				// 从服务器获得数据
				console.log(xhr.responseText);
				// 判断请求文件类型是txt文件,不是将json字符串装换成json对象
				if (opts.url.indexOf(".txt")!=-1){
					// 将文本字符串装换成json对象
					var data = this.responseText;
				} else {
					// 将json字符串装换成json对象
					var data = JSON.parse(this.responseText);
				}

				// console.log(res);
				opts.success(data);

			} else {
				console.log("Request was unsuccessful: " + xhr.status);
			}

			// if (xhr.readyState == 4) {
			// 	if(xhr.status == 200){
			// 		ajaxData.success(xhr.response)
			// 	}else{
			// 		ajaxData.error()
			// 	}
			// }

		};
	};
	/**
	 * AJAX统一请求接口（原生JS）
	 * @param {Object} obj 			Ajax 请求参数
	 * @param {function} callback Ajax 请求回调函数
	 * */
	var reqAjaxDataApi = function (obj, callback) {
		reqAjax({
			url: obj.url,
			type: obj.type,
			dataType: obj.dataType,
			data: obj.data,
			success: function (res) {
				if (callback) {
					callback(res);
				}
			},
			error: function(XMLHttpRequest,textStatus,errorThrown){
				//通常情况下textStatus和errorThrown只有其中一个包含信息
				// this;    //调用本次ajax请求时传递的options参数
				console.log(this);
				console.log(XMLHttpRequest);
			}
		});
	};

	/**
	 * 格式化参数
	 * @param {Object} data 	POST请求参数
	 * */
	var formatParams = function(data) {
		if (typeof data === "object"){
			var name, arr=[];
			for(name in data){
				arr.push(encodeURIComponent(name)+'='+encodeURIComponent(data[name]));
			}
			arr.push(('v='+Math.random()).replace('.',''));
			return arr.join('&');
		} else {
			return data;
		}

	};
	/**
	 * 格式化参数(还未确认)
	 * @param {Object} data 	POST请求参数
	 * */
	function convertData(data){
		if( typeof data === 'object' ){
			var convertResult = "" ;
			for(var c in data){
				convertResult+= c + "=" + data[c] + "&";
			}
			convertResult=convertResult.substring(0,convertResult.length-1)
			return convertResult;
		}else{
			return data;
		}
	}

	/**
	 * 配置请求接口地址（1.开发环境不同地址不同	2.本地json文件）
	 * @param {Object} obj 			data.js 配置对应接口对象
	 * @param {boolean} flag 			是否请求本地json文件,默认为false
	 * */
	var reqUrl = function(obj, siteUrl, domain) {
		var reqUrl;
		// 判断是否有数据
		if (!obj) {
			console.log("请配置数据对象！");
			return;
		}
		if (isLocalhost(siteUrl, domain)) {
			// 本地开发
			// console.log("本地开发");
			// 默认
			// if (obj.reqDevUrl)
			// 	reqUrl = global.siteUrl + obj.reqDevUrl;
			// console.log(global, domain);
			// 判断是否请求本地json文件
			if (obj.flag){
				reqUrl = obj.reqJson;
			} else if (obj.reqDevUrl && obj.reqDevUrl.indexOf("//")!=-1){
				reqUrl = obj.reqDevUrl;
			} else if (obj.reqDevUrl) {
				reqUrl = global.siteUrl + obj.reqDevUrl;
			} else {
				console.log("数据对象配置错误！");
			}
		} else {
			// 其他(非本地环境)
			// console.log("其他");
			reqUrl = '/' + obj.reqUrl;
			console.log(global);
			if (obj.reqUrl.indexOf("//")!=-1){
				reqUrl = obj.reqUrl;
			}
		}
		// console.log(global);
		return reqUrl;
	};

	/**
	 * 项目开发基本配置
	 *
	 * @param {string} content 模板
	 * @param {any} data 数据
	 * @returns 渲染后的字符串
	 */
	function render(content, data) {
		data = data || {};
		var list = ['var tpl = "";'];
		var codeArr = transform(content);  // 代码分割项数组

		for (var i = 0, len = codeArr.length; i < len; i++) {
			var item = codeArr[i]; // 当前分割项

			if (item.type == 1) {  // js逻辑
				list.push(item.txt);
			}
			else if (item.type == 2) {  // js占位
				var txt = 'tpl+=' + item.txt + ';';
				list.push(txt);
			}
			else {  //文本
				var txt = 'tpl+="' +
					item.txt.replace(/"/g, '\\"') +
					'";';
				list.push(txt);
			}
		}
		list.push('return tpl;');

		return new Function('data', list.join('\n'))(data);
	}

	/**
	 * 普通文本添加到数组，对换行部分进行转义
	 *
	 * @param {Array<{type:number,txt:string}>} list
	 * @param {string} content
	 */
	function appendTxt(list, content) {
		content = content.replace(/\r?\n/g, "\\n");
		list.push({ txt: content });
	}
	// 提供外部调用的参数和方法
	return {
		global						: global,
		isLocal						: isLocalhost,
		config						: ajaxConfig,
		reqDataApi				: reqDataApi,
		reqAjaxDataApi		: reqAjaxDataApi,
		reqUrl						: reqUrl,
	};
}));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * 依赖组件
 */
var miniTpl = __webpack_require__(1);

(function (root, factory) {
	if (true) {
		// AMD
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports === 'object') {
		// Node, CommonJS-like
		// es6 module , typescript
		var mo = factory();
		mo.__esModule = true;
		mo['default'] = mo;
		module.exports = mo;
	} else {
		// browser
		root.draw = factory();
	}
}(this, function () {

	/**
	 * 判断数据类型
	 * @param {Object} len 		Hash位数
	 * */
	var isObjFunc = function(type) {
		var _toString = Object.prototype.toString;
		return function() {
			return _toString.call(arguments[0]) === '[object ' + type + ']'
		}
	};

	// 判断是函数（方法）
	var isFunction = function() {
		return isObjFunc("Function")(arguments[0]);
	};

	// 判断是字符串
	var isString = function() {
		return isObjFunc("String")(arguments[0]);
	};

	// 判断是对象
	var isObject = function() {
		return isObjFunc("Object")(arguments[0]);
	};

	// 判断是jq对象
	var isJqObject = function (obj) {
		if (obj instanceof jQuery){
			return true;
		}
	};

	/**
	 * 生成Hash
	 * @param {Object} len 		Hash位数
	 * */
	var createHash = function(len){
		if (!len || typeof(Number(len)) != 'number') {return;}
		var ar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
		var hs = [];
		var hl = Number(len);
		var al = ar.length;
		for (var i = 0; i < hl; i++) {
			hs.push(ar[Math.floor(Math.random() * al)]);
		}
		return hs.join('');
	};

	/**
	 * 字符串转DOM
	 * @param {Object} len 		Hash位数
	 * */
	var parseDom = function(str){
		var objEl = document.createElement("div");
		objEl.innerHTML = str;
		return objEl.childNodes;
	};

	/**
	 * 去左右空格
	 * @param {Object} len 		Hash位数
	 * */
	var trim = function (v) {
		return v.replace(/(^\s*)|(\s*$)/g, "");
	}

	/**
	 * 创建构造函数
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var draw = function (opt, el) {
		this.ele = $(el);
		// 默认参数
		this.def = {
			// 文字信息
			title: "对话框",	// 标题
			sureTxt: "确定",		// 确定文字
			cancelTxt: "取消",	// 取消文字
			noData: "暂无信息",
			// class配置
			sureBtn: "confirm_opt",		// 确定按钮class
			cancelBtn: "cancel_opt",	// 取消按钮class
			maskClass: "mask_opt",
			apendClass	: "body",

			// 样式配置
			height: "",
			z_index: 100,
			opacity: 0.3,

			// 指定模板
			skin: 1,					// 匹配对应TPL文件的tpl
			innerText: "",		// 页面隐藏域的字符串

			// 数据相关
			data: null,				// 是否传入数据

			// 是否启用开关
			mask: true, // 是否显示半透明背景
			maskClose: false,  // 是否点击半透明背景隐藏弹出框
			isDestroy: true,

			// 回调方法
			onShow: null, 	// 弹窗显示后触发事件
			onClose: null, 	// 弹窗关闭后触发事件
			onSure: null,		// 触发确认后事件
			onCancel: null,	// 触发取消或关闭后事件

			// 暂未使用
			width: 300,			// 主体元素的宽度 		1. auto 	2. 200px
			height: "",		// 主体元素的高度		1. auto 	2. 200px
			setTop: 0,		// 设置主题元素距离顶部的距离
			pop_per: 0.8,		// 设置主体元素占窗口的百分比

			bar: false, // 是否显示标题栏
			btnClose: true, // 是否显示关闭按钮

			fix: true, // 是否弹出框固定在页面上

			speed: "fast",	// 关闭时，隐藏速度 1500、"slow"、"normal"、"fast"
		};
		// 合并参数
		this.opts = $.extend({}, this.def, opt);
		// 生成Hash
		this.hash = createHash(8);
		// console.log(this);
		// 初始化插件
		this.init(el, opt);
	};
	/**
	 * 定义构造函数方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	draw.prototype = {
		// 初始化
		init: function (el, opt) {
			// console.log("初始化！！！");
			// console.log("def", this.def);
			// console.log("opts", this.opts);
			// 判断是否传入DOM元素, 调用时需要把页面和样式写好
			if (isJqObject(el)){	// jq对象操作
				// $(el).show();
				this.objectOpt(el, this.opts);
				return;
			}

			// 判断是从页面配置html
			if (this.opts.innerText){
				// 判断是从页面配置html
				this.tpl = trim(this.opts.innerText);
			} else if (isString(el)){		// 判断是否传入DOM字符串
				this.tpl = el;
			} else {
				// 根据类型匹配模板
				this.tpl = this.matchType(this.opts.skin);
			}

			// 渲染模板
			var _Html = miniTpl(this.tpl, this.buidData());

			// 插入html
			this.insertHtml(this.opts.apendClass, parseDom(_Html));

			// 绑定事件
			this.bindEvent(this.opts);

		},

		/**
		 * 绑定事件
		 * @param {Array<{type:number,txt:string}>} list
		 */
		bindEvent: function (obj) {
			var _this = this,
				$mask = $('.'+obj.maskClass+'-'+this.hash),
				$confirm = $('.'+obj.sureBtn+'-'+this.hash),
				$cancel = $('.'+obj.cancelBtn+'-'+this.hash),
				attr_v = "[data-v='"+this.hash+"']";

			// console.log(attr_v);
			// console.log($(attr_v));

			// 阴影操作
			this.maskOpt($mask, $(attr_v), obj);

			// 弹窗显示后触发事件
			if (obj.onShow) {
				obj.onShow($(attr_v));
			}
			// 弹窗关闭后触发事件
			if (obj.onClose) {
				_this.destroyDraw($(attr_v));
				obj.onClose($(attr_v), _this);
			}
			// 触发确认后事件
			if ($confirm.length > 0) {
				$confirm.click(function () {
					if (obj.onSure) {
						obj.onSure($(attr_v), _this);
					} else {
						_this.destroyDraw($(attr_v));
					}
				});
			}
			// 触发取消或关闭后事件
			if ($cancel.length > 0) {
				$cancel.click(function () {
					_this.destroyDraw($(attr_v));
					if (obj.onCancel) {
						obj.onCancel($(attr_v), _this);
					}
				});
			}
		},

		/**
		 * 阴影操作
		 * @param {Array<{type:number,txt:string}>} list
		 */
		maskOpt: function (mask, draw, obj) {
			var _this = this;
			// 判断是否显示遮罩
			if (!obj.mask){
				mask.hide();
			}
			// 判断有阴影和阴影可关闭
			if (obj.mask && obj.maskClose){
				mask.click(function () {
					// console.log("mask关闭！");
					// draw.remove();
					_this.destroyDraw(draw);
					obj.onCancel && obj.onCancel();
				});
			}
		},

		/**
		 * 对象操作
		 * @param {Array<{type:number,txt:string}>} list
		 */
		objectOpt : function (el, obj) {
			// 显示DOM对象
			el.show();

			// 弹窗显示后触发事件
			if (obj.onShow) {
				obj.onShow(el);
			}
		},

		/**
		 * 把HTML插入页面
		 * @param {Array<{type:number,txt:string}>} list
		 */
		insertHtml: function (el, html) {
			if (el == "body") {
				// $("body").append(_Html);				// jq参入方式
				// document.body.innerHTML = html;	// js参入方式
				document.body.append(html[0]);
			} else {
				document.getElementsByClassName(el)[0].append(html[0]);
			}
		},

		/**
		 * 销毁插件
		 * @param {Array<{type:number,txt:string}>} list
		 */
		destroyDraw: function (el) {
			if (this.opts.isDestroy){
				el.remove();
			} else {
				el.hide();
			}
		},

		/**
		 * 构造数据并返回
		 * @param {Array<{type:number,txt:string}>} list
		 */
		buidData: function () {
			// 拼接数据
			var _data = {
				// 文字
				title: this.opts.title,
				sureTxt: this.opts.sureTxt,
				cancelTxt: this.opts.cancelTxt,
				noData: this.opts.noData,
				// class
				hash: this.hash,
				sureBtn: this.opts.sureBtn,
				cancelBtn: this.opts.cancelBtn,
				maskClass: this.opts.maskClass,
				// 样式
				opacity: this.opts.opacity,
				z_index: this.opts.z_index,
				height: this.opts.height,
				// 数据
				data: this.opts.data,
			};
			return _data;
		},

		/**
		 * 根据类型匹配模板
		 * @param {Array<{type:number,txt:string}>} list
		 */
		matchType: function (type) {
			var _tpl;
			switch (type) {
				case 1:			// 页面数据已存在不需要替换数据( 1、固定html不需要变动	2、ajax先把数据放入html )
					_tpl = tpl.skin1;
					break;
				case 2:			// 页面参数配置，数据配置
					_tpl = tpl.skin2;
					break;
				default:
					_tpl = tpl.skin1;
			}
			return _tpl;
		},

	};

	/**
	 * 实例化插件
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var drawer = function (opt, el) {
		// 如果opt是jq对象或字符串，把opt赋值给el
		if (isJqObject(opt) || isString(opt)){
			el = opt;
			opt = null;
		}
		// 实例化
		// var draw = new draw();
		return new draw(opt, el);
	};

	// 提供外部调用的参数和方法
	return drawer;
}));


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.quantity = factory();
	}
})(this, function() {

	/**
	 * 生成Hash
	 * @param {Object} len 		Hash位数
	 * */
	var createHash = function(len){
		if (!len || typeof(Number(len)) != 'number') {return;}
		var ar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
		var hs = [];
		var hl = Number(len);
		var al = ar.length;
		for (var i = 0; i < hl; i++) {
			hs.push(ar[Math.floor(Math.random() * al)]);
		}
		return hs.join('');
	};

	/**
	 * @description 事件绑定，兼容各浏览器
	 * @param target 事件触发对象
	 * @param type   事件
	 * @param fn   事件处理函数
	 */
	var addEvent = function (target, type, fn) {
		//通过判断调用的方式兼容IE678
		//判断浏览器是否支持该方法，如果支持那么调用，如果不支持换其他方法
		if(target.addEventListener){ //火狐谷歌IE9+支持addEventListener
			//直接调用
			target.addEventListener(type, fn);
		}else if(target.attachEvent){ //IE678支持attachEvent
			target.attachEvent("on" + type, fn);
		}else{
			//在addEventListener和attachEvent都不存在的情况下，用此代码
			target["on" + type] = fn;
		}
	};
	/**
	 * @description 事件移除，兼容各浏览器
	 * @param target 事件触发对象
	 * @param type   事件
	 * @param fn   事件处理函数
	 */
	var unbindEvent = function (target, type, fn) {
		if (target.removeEventListener)
			target.removeEventListener(type, fn);
		else if (target.detachEvent)
			target.detachEvent("on" + type, fn);
		else target["on" + type] = null;
	};

	/**
	 * 正则验证
	 * @param {Object} patt 		正则表达式
	 * */
	var resetInput = function (patt, el) {
		var v = el.value.replace(patt, "");
		el.value = v;
		return v;
	};

	/**
	 * 设置html模板
	 * @param {Object} len 		Hash位数
	 * */
	var getTpl = function(tpl){
		// 定义返回默认值
		var _tpl;
		// 判断渲染模板
		if (tpl) {
			_tpl = tpl;
		} else {
			_tpl = defTpl
		}
		return _tpl;
	};

	// 设置默认模块模板
	var defTpl = '<div class="quantity clearfix" >\n' +
		'  <div class="count_opt fl cut">\n' +
		'    <span class="iconfont iconjianshao_f"></span>\n' +
		'  </div>\n' +
		'  <div class="input_opt fl">\n' +
		'    <input class="text_change" disabled type="text" value="0" >\n' +
		'  </div>\n' +
		'  <div class="count_opt fl add">\n' +
		'    <span class="iconfont iconjia"></span>\n' +
		'  </div>\n' +
		'</div>';

	/**
	 * 创建构造函数
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var Quantity = function (el, opt, tpl) {
		this.ele = $(el);
		// 默认参数
		this.def = {
			// 最大值和最小值
			minNum      : 2,
			maxNum      : 5,
			// 类名
			addClassName: 'add',
			cutClassName: 'cut',
			textClassName: 'text_change',
			// 是否插入模板
			isTpl: true,
			// 回调方法
			addHandle   : null,
			cutHandle   : null,
			inputHandle : null
		};
		// 合并参数
		this.opts = $.extend({}, this.def, opt);
		// 生成Hash
		this.hash = createHash(8);
		// console.log(this);
		// 配置html模板
		this.tpl = getTpl(tpl);
		// 初始化插件
		this.init(el, opt);
	};
	
	/**
	 * 定义构造函数方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	Quantity.prototype = {
		// 初始化
		init: function () {
			// console.log(this);
			// 判断是否插入HTML
			if (this.opts.isTpl) {
				// 插入html
				this.insertHtml(this.ele, this.tpl);
			}
			// 绑定事件
			this.bindEvent();
		},
		// 插入html
		insertHtml: function (el) {
			// console.log(el);
			if (!this.ele[0]) return;
			// 把字符串插入页面
			this.ele[0].innerHTML = this.tpl;
			// 获取要加HASH元素
			var innerEl = this.ele[0].firstChild;
			var childrenEl = innerEl.children[1];
			// 给元素添加HASH属性
			innerEl.setAttribute('data-v', this.hash);
			childrenEl.setAttribute('data-v', this.hash);
		},
		// 绑定事件
		bindEvent: function () {
			// 获取绑定元素
			var el = this.ele,
				_opts = this.opts,
				_this = this,
				inputDom = el[0].getElementsByClassName(_opts.textClassName),
				addDom = el[0].getElementsByClassName(_opts.addClassName),
				cutDom = el[0].getElementsByClassName(_opts.cutClassName),
				curV = inputDom[0].value;		// 获取输入框当前值
			// console.log(inputDom);
			// 绑定增加事件
			addEvent(addDom[0], "click", function (){
				// console.log(_opts);
				// console.log(this.parentElement);
				// console.log(this.parentElement.getElementsByClassName(_opts.textClassName));
				_this.addHand(this.parentElement.getElementsByClassName(_opts.textClassName), this.parentElement.getElementsByClassName(_opts.cutClassName));
			});
			// 绑定减少事件
			addEvent(cutDom[0], "click", function (){
				_this.cutHand(this.parentElement.getElementsByClassName(_opts.textClassName), this);
			});
			// 绑定输入事件
			addEvent(inputDom[0], "input", function () {
				console.log(curV);
				_this.inputHand(this, curV);
			});
			// 绑定输入事件兼容写法
			addEvent(inputDom[0], "propertychange", function () {
				_this.inputHand(this, curV);
			});

		},
		// 增加事件
		addHand: function (inputEl, cutEl) {
			// console.log("增加事件");
			// console.log(inputEl);
			// 获取数量最大值
			var newV, maxVal = this.opts.maxNum,
				v = parseInt(inputEl[0].value||0);
			// 判断是否超出最大值
			if (v >= maxVal){
				newV = maxVal;
				inputEl[0].value = newV;
			} else {
				newV = ++v;
				inputEl[0].value = newV;
			}
			// 显示减少数量操作
			// if (cutEl[0]) {
			// 	cutEl[0].style.display = "block";
			// }

			// 判断是否有回调函数
			this.opts.addHandle && this.opts.addHandle(inputEl[0], newV, cutEl[0]);
		},
		// 减少事件
		cutHand: function (inputEl, cutEl) {
			// console.log("减少事件");
			// 获取数量最大值
			var newV, minVal = this.opts.minNum,
				v = parseInt(inputEl[0].value||0);
			// 判断是否超出最大值
			if (v <= minVal){
				newV = minVal;
				inputEl[0].value = newV;
			} else {
				newV = --v;
				inputEl[0].value = newV;
			}

			// 判断是否有回调函数
			this.opts.cutHandle && this.opts.cutHandle(inputEl[0], newV, cutEl);
		},
		// 输入事件
		inputHand: function (el) {
			console.log("输入事件");
			// 获取最大值和最小值
			var newV, maxVal = this.opts.maxNum,
				minVal = this.opts.minNum;
			// 验证只能输入数量,并获取当前输入框值
			var curVal = parseInt(resetInput(/[^\d]/g, el));
			// 判断当前输入值是否超出最大值或最小值
			if (curVal >= maxVal){
				newV = maxVal;
				el.value = newV;
			} else if (curVal <= minVal){
				newV = minVal;
				el.value = newV;
			} else {
				newV = curVal;
			}
			// 判断是否有回调函数
			this.opts.inputHandle && this.opts.inputHandle(el, newV);

		}
	};

	/**
	 * 实例化插件
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var quantity = function (el, opt, tpl) {
		// console.log(el);
		// 遍历元素并实例化
		$(el).each(function () {
			// 输出每个单例
			// console.log(this);
			// 实例化单例
			return new Quantity(this, opt, tpl);
		});
	};
	// 对外开放方法
	return quantity;
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.tpl = factory();
	}
})(this, function() {
	var tpl = {
		// 预约主页模板
		customs: '<!-- 体检套餐 名称和描述 -->\n' +
			'<div class="declaration" >\n' +
			'  <%\n' +
			'  var headInfo = data.header;\n' +
			'  %>\n' +
			'  <div class="tit"><%=headInfo[0]%></div>\n' +
			'  <div class="des"><%=headInfo[1]%></div>\n' +
			'</div>\n' +
			'<!-- 选择套餐 -->\n' +
			'<div class="choose_package" >\n' +
			'  <div class="column_name">\n' +
			'    选择套餐\n' +
			'    <div class="related_sign fr" ></div>\n' +
			'  </div>\n' +
			'  <ul class="cp_list" >\n' +
			'    <%\n' +
			'    for(var i = 0, len = data.sale_list.length; i<len; i++){\n' +
			'    var packageInfo = data.sale_list[i],\n' +
			'      packagePrice = packageInfo.price && "<em>￥</em>"+packageInfo.price,\n' +
			'      isRelated = packageInfo.is_register_related ? "attr_related=1" : "";\n' +
			'      isDrop = packageInfo.introduction ? "" : "noCon";\n' +
			'    %>\n' +
			'    <li id="cp_<%=packageInfo.id%>" attr_id="<%=packageInfo.id%>" attr_related="<%=packageInfo.is_register_related%>" attr_num="<%=i%>" >\n' +
			'      <div class="p_item">\n' +
			'        <!-- 套餐名称 -->\n' +
			'        <div class="p_item_opt">\n' +
			'          <div class="fl "><span class="iconfont iconxuanzhong p_select"></span></div>\n' +
			'          <div class="fr opt_drop"><span class="iconfont iconxiangxia p_drop <%=isDrop%>" ></span></div>\n' +
			'          <div class="p_item_tit">\n' +
			'            <div class="fr p_price">\n' +
			'              <%=packagePrice||""%>\n' +
			'            </div>\n' +
			'            <div>\n' +
			'              <%=packageInfo.key_context_Chinese||""%>\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </div>\n' +
			'        <!-- 套餐描述 -->\n' +
			'        <%\n' +
			'          if(packageInfo.introduction){\n' +
			'        %>\n' +
			'        <div class="p_item_des">\n' +
			'          <div class="triangle-up"></div>\n' +
			'          <div class="p_item_con">\n' +
			'            包含项目：<%=packageInfo.introduction||""%>\n' +
			'          </div>\n' +
			'        </div>\n' +
			'        <%\n' +
			'          }\n' +
			'        %>\n' +
			'      </div>\n' +
			'    </li>\n' +
			'    <%\n' +
			'    }\n' +
			'    %>\n' +
			'  </ul>\n' +
			'</div>\n' +
			'\n' +
			'<!-- 套餐介绍 -->\n' +
			'<div class="" >\n' +
			'  <div class="column_name">套餐介绍</div>\n' +
			'  <ul class="p_img_list">\n' +
			'    <%\n' +
			'    for(var j = 0, len = data.sale_picture.length; j<len; j++){\n' +
			'      var pictureInfo = data.sale_picture[j];\n' +
			'    %>\n' +
			'    <li>\n' +
			'      <img src="<%=pictureInfo.url||\'\'%>">\n' +
			'    </li>\n' +
			'    <%\n' +
			'    }\n' +
			'    %>\n' +
			'    \n' +
			'  </ul>\n' +
			'</div>',
		// 疫苗模板
		vacc: '<div class="drawer" data-v="<%=data.hash%>" id="draw_<%=data.hash%>" >\n' +
			'  <div class="drawer_mask"></div>\n' +
			'  <div class="drawer_out">\n' +
			'    <!--<div class="drawer_cont">-->\n' +
			'    <div class="dw_head dw_m92">\n' +
			'      <div class="fl">\n' +
			'        <a href="javascript:;" class="cancel <%=data.cancelBtn+\'-\'+data.hash%>">取消</a>\n' +
			'      </div>\n' +
			'      <div class="fr">\n' +
			'        <a href="javascript:;" class="confirm <%=data.sureBtn+\'-\'+data.hash%>">确认</a>\n' +
			'      </div>\n' +
			'      <div class="dw_h_name">选择接种疫苗</div>\n' +
			'    </div>\n' +
			'    <div class="dw_body dw_m92">\n' +
			'      <ul class="select_list">\n' +
			'        \n' +
			'        <%\n' +
			'        var i, vaccData = data.data;\n' +
			'        for(i in vaccData){\n' +
			'          var vaccInfo = vaccData[i],\n' +
			'              vaccPrice = vaccInfo.price && "<em>￥</em>"+vaccInfo.price;\n' +
			'        %>\n' +
			'        <li>\n' +
			'          <div class="fl "><span attr_id="<%=vaccInfo.id%>" class="iconfont iconxuanzhong s_select"></span></div>\n' +
			'          <div class="fr s_price"><%=vaccPrice||""%></div>\n' +
			'          <div class="s_list_tit">\n' +
			'            <div>\n' +
			'              <%=vaccInfo.key_context_Chinese||""%>\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'        <%\n' +
			'          }\n' +
			'        %>\n' +
			'      </ul>\n' +
			'    </div>\n' +
			'    <!--</div>-->\n' +
			'  </div>\n' +
			'</div>',
		// 关联登记
		signList: '<div class="drawer" style="display: block" data-v="<%=data.hash%>" id="draw_<%=data.hash%>" >\n' +
			'  <div class="drawer_mask"></div>\n' +
			'  <div class="drawer_out">\n' +
			'    <!--<div class="drawer_cont">-->\n' +
			'    <div class="dw_head dw_m92">\n' +
			'      <div class="dw_h_name">选择预约关联登记</div>\n' +
			'    </div>\n' +
			'    <div class="dw_body dw_m92">\n' +
			'      <ul class="select_sign">\n' +
			'        <%\n' +
			'        var i, signData = data.data;\n' +
			'        for(i in signData){\n' +
			'        var signInfo = signData[i],\n' +
			'          isShow = signInfo.EntryorExit? \'block\' : \'none\';\n' +
			'        %>\n' +
			'        <li class="clearfix" data-id="<%=signInfo.id||\'\'%>">\n' +
			'          <div class="s_sign_item">\n' +
			'            <div class="category fr" style="display: <%=isShow%>"><%=signInfo.EntryorExit||""%></div>\n' +
			'            <div class="info">登记时间：<em><%=signInfo.completed_time||""%></em></div>\n' +
			'            <div class="info">目的地：<em><%=signInfo.destination||""%></em></div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'        <%\n' +
			'        }\n' +
			'        %>\n' +
			'      </ul>\n' +
			'    </div>\n' +
			'    <!--</div>-->\n' +
			'  </div>\n' +
			'</div>',
		// 深度体检模板
		physicalsList: '<div class="drawer" style="display: block" data-v="<%=data.hash%>" id="draw_<%=data.hash%>" >\n' +
			'  <div class="drawer_mask <%=data.maskClass+\'-\'+data.hash%>"></div>\n' +
			'  <div class="drawer_out">\n' +
			'    <!--<div class="drawer_cont">-->\n' +
			'    <div class="dw_head dw_m92">\n' +
			'      <div class="fl">\n' +
			'        <a href="javascript:;" class="cancel <%=data.cancelBtn+\'-\'+data.hash%>">取消</a>\n' +
			'      </div>\n' +
			'      <div class="fr">\n' +
			'        <a href="javascript:;" class="confirm <%=data.sureBtn+\'-\'+data.hash%>">确认</a>\n' +
			'      </div>\n' +
			'      <div class="dw_h_name">选择体检项目</div>\n' +
			'    </div>\n' +
			'    <div class="dw_body dw_m92">\n' +
			'      <!-- 类别 -->\n' +
			'      <dl class="select_list_category clearfix" >\n' +
			'        <%\n' +
			'        var n=0, sortData = data.data.all_applicable_people_classification, len = sortData.length;\n' +
			'        for(; n<len; n++){\n' +
			'        var sortInfo = sortData[n];\n' +
			'        if(n==0) {\n' +
			'        %>\n' +
			'        <dt class="cur" attr_sort="<%=sortInfo.key_context_English||\'\'%>" ><%=sortInfo.key_context_Chinese||""%></dt>\n' +
			'        <%\n' +
			'        } else {\n' +
			'        %>\n' +
			'        <dt attr_sort="<%=sortInfo.key_context_English||\'\'%>" ><%=sortInfo.key_context_Chinese||""%></dt>\n' +
			'        <%\n' +
			'        }}\n' +
			'        %>\n' +
			'      </dl>\n' +
			'      <!-- 列表 -->\n' +
			'      <ul class="select_list list_bt">\n' +
			'        <%\n' +
			'        var m, physicalsData = data.data.children;\n' +
			'        for(m in physicalsData){\n' +
			'        var physicalsInfo = physicalsData[m];\n' +
			'        %>\n' +
			'        <li  data-id="<%=physicalsInfo.id||\'\'%>" data-sort="<%=physicalsInfo.applicable_people_Chinese||\'\'%>" attr_sex="<%=physicalsInfo.applicable_people_English||\'\'%>" >\n' +
			'          <div class="fl "><span  attr_id="<%=physicalsInfo.id%>" class="iconfont iconxuanzhong s_select"></span></div>\n' +
			'          <div class="fr s_price"><em>￥</em><%=physicalsInfo.price||""%></div>\n' +
			'          <div class="s_list_tit">\n' +
			'            <div>\n' +
			'              <%=physicalsInfo.key_context_Chinese||""%>\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'        <%\n' +
			'        }\n' +
			'        %>\n' +
			'      </ul>\n' +
			'    </div>\n' +
			'  <!--</div>-->\n' +
			'  </div>\n' +
			'</div>',
		// 预约主页模板
		timeList: '<div class="drawer" style="display: block"  data-v="<%=data.hash%>" id="draw_<%=data.hash%>" >\n' +
			'  <div class="drawer_mask  <%=data.maskClass+\'-\'+data.hash%>"></div>\n' +
			'  <div class="drawer_out">\n' +
			'    <!--<div class="drawer_cont">-->\n' +
			'    <div class="dw_head dw_m92">\n' +
			'      <div class="fl" style="display: none">\n' +
			'        <a href="javascript:;" class="cancel <%=data.cancelBtn+\'-\'+data.hash%>">取消</a>\n' +
			'      </div>\n' +
			'      <div class="fr" style="display: none">\n' +
			'        <a href="javascript:;" class="confirm <%=data.sureBtn+\'-\'+data.hash%>">确认</a>\n' +
			'      </div>\n' +
			'      <div class="dw_h_name">选择预约时间</div>\n' +
			'    </div>\n' +
			'    <div class="dw_body dw_m92">\n' +
			'      <ul class="select_time">\n' +
			'        <%\n' +
			'        var i=0, timeData = data.data, len = timeData.length;\n' +
			'        for(; i<len; i++){\n' +
			'        var timeInfo = timeData[i];\n' +
			'        %>\n' +
			'        <li class="clearfix"  data-id="<%=i%>" >\n' +
			'          <div class="s_time_data fl"><%=timeInfo.date_string||""%></div>\n' +
			'          <div class="s_time_count fr">剩余<%=timeInfo.left_amount||""%></div>\n' +
			'        </li>\n' +
			'        <%\n' +
			'        }\n' +
			'        %>\n' +
			'      </ul>\n' +
			'    </div>\n' +
			'  <!--</div>-->\n' +
			'  </div>\n' +
			'</div>',
		// 预约主页模板
		visitsList: '<div class="drawer" style="display: block;" data-v="<%=data.hash%>" id="draw_<%=data.hash%>" >\n' +
			'  <div class="drawer_mask"></div>\n' +
			'  <div class="drawer_out">\n' +
			'    <!--<div class="drawer_cont">-->\n' +
			'    <div class="dw_head dw_m92">\n' +
			'      <div class="fl">\n' +
			'        <a href="javascript:;" class="cancel <%=data.cancelBtn+\'-\'+data.hash%>">取消</a>\n' +
			'      </div>\n' +
			'      <div class="fr">\n' +
			'        <a href="javascript:;" class="confirm <%=data.sureBtn+\'-\'+data.hash%>">确认</a>\n' +
			'      </div>\n' +
			'      <div class="dw_h_name">请选择陪诊时间</div>\n' +
			'    </div>\n' +
			'    <div class="dw_body dw_m92">\n' +
			'      <div class="select_visits" >\n' +
			'        <!-- 中英文选择 -->\n' +
			'        <ul class="clearfix">\n' +
			'          <%\n' +
			'          var i, visitsData = data.data.children;\n' +
			'          for(i in visitsData){\n' +
			'          var visitsInfo = visitsData[i];\n' +
			'          if(i==6) {\n' +
			'          %>\n' +
			'          <li data-id="<%=visitsInfo.id%>">\n' +
			'            <div class="fl "><span class="iconfont iconiconfontxuanzhong4 s_select"></span></div>\n' +
			'            <div class="visit_tit"><%=visitsInfo.key_context_Chinese%></div>\n' +
			'          </li>\n' +
			'          <%\n' +
			'          } else {\n' +
			'          %>\n' +
			'          <li data-id="<%=visitsInfo.id%>">\n' +
			'            <div class="fl "><span class="iconfont iconxuanzhong s_select"></span></div>\n' +
			'            <div class="visit_tit"><%=visitsInfo.key_context_Chinese%></div>\n' +
			'          </li>\n' +
			'          <%\n' +
			'          }}\n' +
			'          %>\n' +
			'        </ul>\n' +
			'        <!-- 时间选择 -->\n' +
			'        <div class="visit_time">\n' +
			'          \n' +
			'          <div class="visit_count clearfix">\n' +
			'            <div class="opt_count fl cut" ><span class="iconfont iconjianshao_f"></span></div>\n' +
			'            <div class="input_count fl">\n' +
			'              <input class="text_change" type="text" disabled value="<%=data.data.accompany_duration_minandmax.min%>小时" >\n' +
			'            </div>\n' +
			'            <div class="opt_count fl add"><span class="iconfont iconjia"></span></div>\n' +
			'          </div>\n' +
			'          <div class="visit_des"><%=data.data.accompany_duration_minandmax.discription%></div>\n' +
			'          \n' +
			'        </div>\n' +
			'        <!-- end -->\n' +
			'      </div>\n' +
			'    </div>\n' +
			'    <!--</div>-->\n' +
			'  </div>\n' +
			'</div>',
		// 药品列表
		drug: '<!-- 药品列表 -->\n' +
			'<div class="drug skin1">\n' +
			'  <!-- 搜索 -->\n' +
			'  <div class="drug_search d_m92">\n' +
			'    <div class="search_input" >\n' +
			'      <span class="iconfont iconsousuo"></span>\n' +
			'      <input  type="search" placeholder="" >\n' +
			'    </div>\n' +
			'  </div>\n' +
			'  <!-- 列表 -->\n' +
			'  <!--<div class="drug_container">-->\n' +
			'    <div class="drug_m">\n' +
			'      <!-- 类别 -->\n' +
			'      <div class="drug_l fl">\n' +
			'        <ul class="d_category">\n' +
			'          <%\n' +
			'          var i, catData = data.drug;\n' +
			'          for(i in catData){\n' +
			'          var catInfo = catData[i];\n' +
			'          if(i == 0) {\n' +
			'          %>\n' +
			'          <li data-v="<%=catInfo.cat_id||\'\'%>" class="cur k_<%=catInfo.cat_id||\'\'%>">\n' +
			'            <%=catInfo.cat_name||""%>\n' +
			'          </li>\n' +
			'          <%\n' +
			'            } else {\n' +
			'          %>\n' +
			'          <li data-v="<%=catInfo.cat_id||\'\'%>" class="k_<%=catInfo.cat_id||\'\'%>">\n' +
			'            <%=catInfo.cat_name||""%>\n' +
			'          </li>\n' +
			'          <%\n' +
			'          }}\n' +
			'          %>\n' +
			'        </ul>\n' +
			'      </div>\n' +
			'      <!-- 药品列表 -->\n' +
			'      <div class="drug_r">\n' +
			'        <div class="d_list d_m92">\n' +
			'          <%\n' +
			'          for(i in catData){\n' +
			'          var catInfo = catData[i];\n' +
			'          %>\n' +
			'          <div class="d_name v_<%=catInfo.cat_id||\'\'%>"><%=catInfo.cat_name||""%></div>\n' +
			'          <ul class="v_<%=catInfo.cat_id||\'\'%>" data-v="<%=catInfo.cat_id||\'\'%>" >\n' +
			'            <%\n' +
			'            var drugData = catInfo.goods_list\n' +
			'            for(j in drugData){\n' +
			'            var drugInfo = drugData[j];\n' +
			'            %>\n' +
			'            <li class="drug_<%=drugInfo.id||\'\'%>" data-v="<%=drugInfo.id||\'\'%>"  data-cat="<%=catInfo.cat_id||\'\'%>" >\n' +
			'              <div class="d_detail clearfix">\n' +
			'                <div class="d_img fl">\n' +
			'                  <img src="<%=drugInfo.goods_img||\'\'%>" >\n' +
			'                </div>\n' +
			'                <div class="d_des">\n' +
			'                  <div class="d_tit" ><%=drugInfo.goods_name||\'\'%></div>\n' +
			'                  <div class="clearfix">\n' +
			'                    <div class="quantity_count fr">\n' +
			'                      <div class="quantity sk1" data-v="r0d3unfc">\n' +
			'                        <div class="count_opt fl cut">\n' +
			'                          <span class="iconfont iconjjian-"></span>\n' +
			'                        </div>\n' +
			'                        <div class="input_opt fl" data-v="r0d3unfc">\n' +
			'                          <input class="text_change" disabled="" type="text" value="">\n' +
			'                        </div>\n' +
			'                        <div class="count_opt fl add">\n' +
			'                          <span class="iconfont iconwuuiconxiangjifangda"></span>\n' +
			'                        </div>\n' +
			'                      </div>\n' +
			'                    </div>\n' +
			'                    <div class="d_price" > ￥<em><%=drugInfo.price||\'\'%></em></div>\n' +
			'                  </div>\n' +
			'                </div>\n' +
			'              </div>\n' +
			'            </li>\n' +
			'            <%\n' +
			'            }\n' +
			'            %>\n' +
			'          </ul>\n' +
			'          <%\n' +
			'          }\n' +
			'          %>\n' +
			'        </div>\n' +
			'      </div>\n' +
			'    </div>\n' +
			'  <!--</div>-->\n' +
			'  <!-- 底部 -->\n' +
			'  <div class="drug_foot" >\n' +
			'    <div id="sure_drug" class="f_sure fr">确定</div>\n' +
			'    <div class="f_total">\n' +
			'      <div class="f_cart fl" id="drug_cart" >\n' +
			'        <img class="drug_box" src="../images/customs/drugBox.png">\n' +
			'        <span id="cart_count" class="count"><%=data.shop_cart.total_num||\'\'%></span>\n' +
			'      </div>\n' +
			'      <div id="total_price" class="f_price"><em>￥</em><%=data.shop_cart.total_price||0%></div>\n' +
			'    </div>\n' +
			'  </div>\n' +
			'  <!-- end -->\n' +
			'  \n' +
			'</div>',
		// 自选记录
		card_record: '<div class="drawer" style="display: block" data-v="<%=data.hash%>" id="draw_<%=data.hash%>" >\n' +
			'  <div class="drawer_mask <%=data.maskClass+\'-\'+data.hash%>"></div>\n' +
			'  <div class="card_record" >\n' +
			'    <div class="c_record_head clearfix">\n' +
			'      <div class="clear_record fr"><span class="iconfont icondelete"></span>清空记录</div>\n' +
			'      <div class="c_fare" style="display: none;">运费15元（支持自取）</div>\n' +
			'    </div>\n' +
			'    <div class="c_record_body">\n' +
			'      <ul class="r_list d_m94">\n' +
			'        <%\n' +
			'        var i, drugData = data.data;\n' +
			'        for(i in drugData){\n' +
			'        var drugInfo = drugData[i],\n' +
			'        drugPrice = drugInfo.price && "<em>￥</em>"+drugInfo.price;\n' +
			'        %>\n' +
			'        <li data-v="<%=drugInfo.gid||\'\'%>">\n' +
			'          <div class="clearfix">\n' +
			'            <div class="r_quantity fr" >\n' +
			'              <div class="quantity sk1" >\n' +
			'                <div class="count_opt fl cut">\n' +
			'                  <span class="iconfont iconjjian-"></span>\n' +
			'                </div>\n' +
			'                <div class="input_opt fl" >\n' +
			'                  <input class="text_change" disabled="" type="text" value="<%=drugInfo.num||\'\'%>">\n' +
			'                </div>\n' +
			'                <div class="count_opt fl add">\n' +
			'                  <span class="iconfont iconwuuiconxiangjifangda"></span>\n' +
			'                </div>\n' +
			'              </div>\n' +
			'            </div>\n' +
			'            <div class="r_price fr"><%=drugPrice||""%></div>\n' +
			'            <div class="r_name"><%=drugInfo.goods_name||""%></div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'        <%\n' +
			'        }\n' +
			'        %>\n' +
			'      </ul>\n' +
			'    </div>\n' +
			'  </div>\n' +
			'</div>',
	};
	return tpl;
});


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAA9CAYAAAAQyx+GAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1OUYwODQ1NUVCMEQxMUU5QjlGMThEOTFBNTJDRkRCMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1OUYwODQ1NkVCMEQxMUU5QjlGMThEOTFBNTJDRkRCMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5RjA4NDUzRUIwRDExRTlCOUYxOEQ5MUE1MkNGREIwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU5RjA4NDU0RUIwRDExRTlCOUYxOEQ5MUE1MkNGREIwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+78xWZgAABUNJREFUeNrsW11oHFUUPnd2s2nSxFpttlkNKorUgrUP1YIIgg+iPlUkscEXX8RSiWhBFIOgglQUoYomBVEfS+vfgy9aBJWC+OAP1iqxlCZp2Pw33YS6u7O72bl+Z2aTnd3MZme2M7PJ7hz4mLtzZ86d8+13zr0zOyuklOSlbTmqWe1uAR4BHgbuA24Hri/0LQKjwK/A98BpdVDJkc8mPCfm7RJiOPgXgeeALpsuLgNDwPvqq8piwxDT+s4qMf0cHLCzRlezTGrmFeVkYxDzrhbC5kPgsEsujwPPZ15W8puWmNb3dFI+B56w6E4AJ7iGAGeBGT4FuBm4s1CDngK2W5z7NfBk5iXvyPGUmMgxyUoZKNutAkeBY8B/VVx0AEeAQS5XZX1D2SNiYNMRE/lAHsSmvB6MAweAv+z6yb4g2NceNL8Bbivr7kf/qboQ8+ZZ507fOiN59jkPRE2748D9ha1te+1BseKzB5tfgB5T9xywC8dUnK1e31sbMYoncglhSg6BlJDeZqhALxA37bOHIkHxgg/V1B/Vx/JbMVBLbzpPXyxliZY1ew41uDs1IkldLu67B7rZ1y1cueDfpiWdmzetk8JEB3cLUmy6D0MK2yJEbSHqg5q+dEwMSNlxJUP/TCQpqhNjsxQl0kQjl2XJheyLCQq5pM08vqDfQY75i9q9Q9D2NpvECIOYW7bS3A2tdDfImbc8rpIDNU/HmZTpFFEqbyjB1iosLUmaSGjHBLzk8oK+A/NTQi1+nk7xmPYkw4elDDVH28M0jG2f7RrDKRRPUu9ChijtgBQ2Pl73WkBnq3A9/zvYp2kMVbN/LsfC18ixcYwcqy1iOIVm0zQ0h28kmXNGCluGBMlQEVvCHiwcUXjNY/CYToxj4tg4Ro4VMXdVJYZTaDpt1JUcHDhd5WiiVDFhD+a9sFI6huZQlBwTx8YxcqyIeXhdYq4lhVZnavYoDHAA7ieS4TNsGqeWwl4tpRS3UmjFbkJhDEHq4ZDR9srcGMcipaJrZqVrTaHVwogL3dVGnpsb45Sn1HUR/blP36pi3EihzWrmlJo0pZR440/ZldPo74tXKcqdWSaGmstYHREo8Easue7opLkWhfZwKg2jEd2JPO1sgbwkNaUJFPF2kMNc8CMNce9XmSalosqSYH5BCViwImYhERBjSUxuOSDBvwdVATEBMQExgRXWNeZHm+Kk/oP6tiblYlH2F3/cK1fMeBOLZGy9VGpmYi4GxNSgmLGAmEAx5Ta64Yh5LEY0dcAAtwPFFOzT/USxNgPcroNp5bGXEIN5fIkkJfSHoT4iZnp2q7el75hE7NmSu+s1Kz6NJsj6LSb/Vp1afdPIkhiIiiW1t65l0H9iRu0SQ01GTHXFCE16tpZ5tIfokwcExdqr8PJ06Wd+4+KZnyV9F/dSMaKKYvJrZeWW2SHFyvgcPrfnhGfP7cdtKGZjLvKEt0XZBjF5724LDv0o6eOHBHU7VM1kkujwT5KvzQvjaXpq3ecxK9bykeS3Ibv8UkNuQJSP76cYz2P8u6rPSoZkx/wkps7rGMvSYf2+k1GA99etoOQ3KDGYsn0uwKJ8fJ/XMMKmYnyemWZQXLu3Gu3ZpO8LPMvJRqlAzKh+cT7h0LdSJ2TqKtGzaPs5diURrFd8fbPTFyTdekFWSCzPbcJ+8ZV0qVACQ9TYpqqDyoztVCr8OXOSGt8uVepQnE5jATHk3c3kZiemGX5KGQ8U42BGqkbMuSYg5t9aiOE/dJ5pYFJGgD8cE4Mpm1dc/H/pz4ArDURICvgBeBwxVrz5+F+AAQB4r3LamnJ6RwAAAABJRU5ErkJggg=="

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[4]);