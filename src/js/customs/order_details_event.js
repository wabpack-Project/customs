// 组件引用
// ajax
import ajax from "../vendors/ajax/config";
// 模板渲染
import miniTpl from "../vendors/mini-tpl/mini-tpl";
// wap标题栏
import header from "../vendors/header/js/header";
// 支付方式
import payment from "../vendors/payment/js/payment";
// 二维码支付
import qrCode from "../vendors/qrCode/js/qrCode-1.0.0";
// BASE64解析
var Base64 = require("../vendors/Base64/Base64");
// 加载中
import loading from "../vendors/loading/js/loading-1.0.0";

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
	var tpl = {
		orderDetails: '<!-- 中间 -->\n' +
			'<main>\n' +
			'  <%\n' +
			'  var orderInfo = data;\n' +
			'  %>\n' +
			'  <!-- 项目信息 -->\n' +
			'  <div class="payment_info card mg_btm">\n' +
			'    <div class="pf_name">项目信息</div>\n' +
			'    <!---->\n' +
			'    <ul class="pf_list">\n' +
			'      <%\n' +
			'      var i = 0, orderDetail = data.details, len = orderDetail.length;\n' +
			'      for(; i<len; i++){\n' +
			'      var detailInfo = orderDetail[i];\n' +
			'      %>\n' +
			'      <li>\n' +
			'        <div class="pf_item clearfix">\n' +
			'          <div class="pf_item_img fl"><img src="<%=detailInfo.img_url||\'\'%>"></div>\n' +
			'          <div class="pf_item_tit row_2 fl"><%=detailInfo.order_name||\'\'%></div>\n' +
			'          <div class="pf_item_other fr">\n' +
			'            <span><em>￥</em><%=detailInfo.price||\'\'%></span>\n' +
			'            <i>x<%=detailInfo.num||\'\'%></i>\n' +
			'          </div>\n' +
			'        </div>\n' +
			'      </li>\n' +
			'      <%\n' +
			'      }\n' +
			'      %>\n' +
			'    </ul>\n' +
			'  <!---->\n' +
			'    <div class="pf_price">\n' +
			'      <div class="pf_price_item clearfix">小计：<span class="fr"><em>￥</em><%=orderInfo.amount||\'\'%></span></div>\n' +
			'      <div class="pf_price_item clearfix">优惠：<span class="fr"><em>￥</em><%=orderInfo.discount||\'\'%></span></div>\n' +
			'      <div class="pf_price_item clearfix">运费：<span class="fr"><em>￥</em><%=orderInfo.delivery_fee||\'\'%></span></div>\n' +
			'    </div>\n' +
			'  <!---->\n' +
			'    <div class="pf_total">\n' +
			'      <i>共<%=orderInfo.pay_num||\'\'%>个项目</i>  实付款：\n' +
			'      <span><em>￥</em><%=orderInfo.total_fee||\'\'%></span>\n' +
			'    </div>\n' +
			'  </div>\n' +
			'  <!-- 详细信息 -->\n' +
			'  <div class="base_info card">\n' +
			'    <div class="bf_name">详细信息</div>\n' +
			'    <div class="bf_con">\n' +
			'      <div class="bf_item">订单编号：<span><%=orderInfo.orderno||\'\'%></span></div>\n' +
			'      <div class="bf_item">下单时间：<span><%=orderInfo.insertdate||\'\'%></span></div>\n' +
			'      <div class="bf_item">订单状态：<span><%=orderInfo.status||\'\'%></span></div>\n' +
			'      <div class="bf_item">就诊医生：<span><%=orderInfo.doctor_name||\'\'%></span></div>\n' +
			'      <div class="bf_item">就诊医院：<span><%=orderInfo.hospital_name||\'\'%></span></div>\n' +
			'    </div>\n' +
			'  </div>\n' +
			'  <!-- FORM 提交 -->\n' +
			'  <div class="pay_form" >\n' +
			'    <form action="/dh_pay" method="post" id="paying_form" >\n' +
			'      <!-- 签名 -->\n' +
			'      <input type="hidden" id="signature" name="signature" value="<%=orderInfo.signature||\'\'%>"/>\n' +
			'      <!-- 订单id -->\n' +
			'      <input type="hidden" id="orderid" name="orderid"  value="<%=orderInfo.oid||\'\'%>"/>\n' +
			'      <!-- 订单号 -->\n' +
			'      <input type="hidden" id="orderno" name="orderno" value="<%=orderInfo.orderno||\'\'%>"/>\n' +
			'      <!-- Android版本-->\n' +
			'      <input type="hidden" id="android_version" name="android_app_version" value="0"/>\n' +
			'      <!-- app包名-->\n' +
			'      <input type="hidden" id="app_name" name="app_name" value=""/>\n' +
			'      <!-- 支付方式 -->\n' +
			'      <input type="hidden" id="pay_type" name="payingtype" value="wxpay">\n' +
			'    </form>\n' +
			'  </div>\n' +
			'  <!-- end -->\n' +
			'</main>\n' +
			'<!-- 底部 -->\n' +
			'<%\n' +
			'if(!!orderInfo.is_member) {\n' +
			'%>\n' +
			'<footer>\n' +
			'  <div class="foot_opt skin3">\n' +
			'    <a href="javascript:;" class="wxpay" >微信收款</a>\n' +
			'    <a href="javascript:;" class="alipay" >支付宝收款</a>\n' +
			'    <a href="javascript:;" class="prepare" >去支付</a>\n' +
			'  </div>\n' +
			'</footer>\n' +
			'<%\n' +
			'} else {\n' +
			'%>\n' +
			'<footer>\n' +
			'  <div class="foot_opt skin3">\n' +
			'    <a href="javascript:;" class="prepare" >代付</a>\n' +
			'    <a href="javascript:;" class="wxpay" >微信收款</a>\n' +
			'    <a href="javascript:;" class="alipay" >支付宝收款</a>\n' +
			'    <a href="javascript:;" class="remind_member" >提醒会员</a>\n' +
			'  </div>\n' +
			'</footer>\n' +
			'<%\n' +
			'}\n' +
			'%>\n' +
			'<!-- end -->',
		qrcodeTpl: '<div class="popup">\n' +
			'  <div class="popup_mask"></div>\n' +
			'  <div class="popup_out">\n' +
			'    <div class="pop_head">\n' +
			'      <div class="qc_price">支付金额：<span><em>￥</em><%=data.total_fee||\'\'%></span></div>\n' +
			'    </div>\n' +
			'    <div class="pop_body">\n' +
			'      <div class="qrCode">\n' +
			'        <div class="qc_img">\n' +
			'          <div class="qc_id_img">\n' +
			'            <img src="<%=data.code_url||\'\'%>">\n' +
			'          </div>\n' +
			'          <div class="qc_id_invalid">\n' +
			'            <div class="qc_void">\n' +
			'              <i class="iconfont iconshuaxin"></i>\n' +
			'              <p class="qc_txt">二维码失效，点击刷新</p>\n' +
			'            </div>\n' +
			'            <div class="qc_mask"></div>\n' +
			'          </div>\n' +
			'        </div>\n' +
			'        <div class="qc_time">该二维码 <span><%=data.timeout_express||\'\'%>分钟</span>后过期</div>\n' +
			'        <div class="qc_des">请用<%=data.payName||\'\'%>扫描</div>\n' +
			'      </div>\n' +
			'    </div>\n' +
			'  </div>\n' +
			'</div>',
		header : '<header class="head">\n' +
			'  <a class="iconfont iconback" href="javascript:window.history.back();"></a>\n' +
			'  <h1>海关体检预约海关体检</h1>\n' +
			'  <a class="word_4" href="/signin">取消订单</a>\n' +
			'</header>',
	};
	/**
	 * 数据
	 */
	// 接口参数和返回数据
	var data = {
		// 未支付订单详情信息
		orderDetails : {
			reqUrl	: "ajax_dh_orderform",
			reqDevUrl	: "ajax_dh_orderform",
			reqJson : "../../service/orderDetails/orderDetails-doc.json",
			flag		: true
		},
		// 生成未支付订单二维码
		qrCodePay : {
			reqUrl	: "ajax_dh_nativepay",
			reqDevUrl	: "ajax_dh_nativepay",
			reqJson : "../../service/orderDetails/qrCodePay.json",
			flag		: true
		},
		// 发送系统消息、短信接口
		sendRemindMessage : {
			reqUrl	: "ajax_dh_sendsms",
			reqDevUrl	: "ajax_dh_sendsms",
			reqJson : "../../src/data/customs.json",
			flag		: false
		},
	};

	/**
	 * 本地数据
	 */
	var global = {};

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

	// 获取版本号
	var getAppVersion = function () {
		if (android_app){
			console.log("安卓 APP内支付");
			// 获取版本号
			var appInfo = window.LanCareWeb.getVersion(),
				jsonobj = jQuery.parseJSON(appInfo);
			// alert(jsonobj);
			// 判断appInfo是否存在
			if (!appInfo) return;
			// alert("appInfo存在！");
			// alert(jsonobj.packageName);
			// alert(jsonobj.ver);
			// 存储版本号和包名信息
			global.appInfo = {
				packageName: jsonobj.packageName,
				version: jsonobj.ver,
			};
			// 页面赋值
			// $("#app_name").val(appInfo.packageName);

		} else if (ios_app){
			console.log("IOS APP内支付");
			window.webkit.messageHandlers.Lancare.postMessage('getVersionAndName');
		} else {
			console.log("非APP内支付");
			var code = "eyJuYW1lIjoiY24ubGFuY2FyZS5sYW5jYXJlIiwidmVyc2lvbiI6IjMuMC41OVwvMjAxOTEwMTQwMDAwMDEifQ==";
			// getVersionAndNameForIos(code);
		}
	};
	// 提升IOS回调方法作用域，解析ios传回的base64编码
	window.getVersionAndNameForIos = function (code) {
		// 判断编码不存在并退出
		if (!code) return;
		// 解析base64编码
		var Base = new Base64(),
			jsonobj = jQuery.parseJSON(Base.decode(code));
		console.log("Base", jsonobj);
		// {name: "cn.lancare.lancare", version: "3.0.59/20191014000001"}
		// alert(jsonobj.name);
		// alert(jsonobj.version);
		// 存储版本号和包名信息
		global.appInfo = {
			packageName: jsonobj.name,
			version: jsonobj.version,
		};

		// 页面赋值
		// $("#app_name").val(jsonobj.name);
		// $("#android_version").val(jsonobj.version);
	};
	// IOS回调方法
	var getVersionForIos = function (app_intro) {
		alert(app_intro);
	};

	/**
	 * 页面操作（1. 插入DOM）
	 */
	var loadOrderDetails = function (d) {
		console.log(d);
		// 储存订单相关信息
		saveOrderInfo(d);
		// 本地测试转医生为会员
		// d.is_member = 1;
		// console.log(tpl);
		// 模板替换
		var _html = miniTpl(tpl.orderDetails, d);
		// 插入DOM
		$("body").append(_html);
		// 绑定事件
		bindEvent(d);
	};

	// 保存订单相关信息
	var saveOrderInfo = function (d) {
		// 储存订单支付信息
		global.paymentInfo = {
			signature: d.signature,
			orderid: d.oid,
			orderno: d.orderno,
		};
		console.log("支付信息", global.paymentInfo);
		// 储存订单信息
		global.orderInfo = {
			total_fee: d.total_fee,
		};
		console.log("订单信息", global.orderInfo);
		// 储存是否有家庭医生
		global.is_family_doctor = d.is_family_doctor;
		console.log("是否有家庭医生", global.is_family_doctor);
		// 储存卡片信息
		global.extend = {
			card_url: d.url,			// 卡片地址
			card_type: "5",		// 卡片类型
			register_date: d.register_date,		// 发卡片时间
			processing_status: "0",		// 处理状态 0待处理 1已处理
			// data_id: d.oid,
		};
		console.log("卡片信息", global.extend);
		// 存储卡片提示
		global.card_content = d.card_content;
		console.log("卡片内容", global.card_content);
		// 判断是会员还是医生，储存发送人
		if (!!d.is_member){ // 是会员
			global.user = {
				id: d.user_id,
				name: d.user_name,
			}
		}
		console.log("卡片发送用户", global.user);
	};

	/**
	 * DOM事件绑定
	 */
	var bindEvent = function (id, url) {
		// 获取元素
		var $prepare 	= $(".prepare"),
			$wxpay 			= $(".wxpay"),
			$alipay 		= $(".alipay"),
			$remind_member = $(".remind_member"),
			$ig_user = $(".remind_member ");

		// 绑定代付事件
		$prepare.click(function (){
			// console.log("代付！");
			payment(function (type, drawEl) {
				// console.log(type, drawEl);
				// 更新form支付方式
				$("#pay_type").val(type);
				// 判断是app，更新form信息
				if (android_app || ios_app) {
					// 更新form版本号和包名
					$("#app_name").val(global.appInfo.packageName);
					$("#android_version").val(global.appInfo.version);
				}
				// console.log($("#app_name").val());
				// console.log($("#android_version").val());
				// 储存订单支付信息
				// global.paymentInfo.pay_type = type;
				// global.paymentInfo.app_name = global.appInfo.packageName;
				// global.paymentInfo.android_version = global.appInfo.version;
				console.log("FORM", global.paymentInfo);
				// 提交form支付
				$("#paying_form").submit();
			});
		});

		// 绑定微信收款事件
		$wxpay.click(function (){
			// console.log("微信收款！");
			global.load = loading();
			// 更新form表单信息
			updateFormValues("wxpay", "微信");
		});

		// 绑定支付宝收款事件
		$alipay.click(function (){
			console.log("支付宝收款！");
			// 更新form表单信息
			updateFormValues("alipay", "支付宝");
		});

		// 绑定提醒会员事件
		$remind_member.click(function (){
			// console.log("提醒会员！");
			console.log("发送系统消息、短信!");
			// 发送消息提醒
			sendRemindMessage();
		});

		// 模拟点击
		// $tg_list.eq(1).click();
	};

	// 原生发送卡片消息
	var sendCardMessage = function () {
		if(android_app) {
			window.LanCareWeb.sendCardMessage(global.card_content, global.user.id, global.user.name, JSON.stringify(global.extend));
		} else if (ios_app) {
			window.webkit.messageHandlers.Lancare.postMessage({
				classname: 'sendCardMessage',
				content: global.card_content,
				toUserId: global.user.id,
				toUserName: global.user.name,
				extend: JSON.stringify(global.extend)
			});
		} else {
			console.log("非APP不能发送卡片消息");
		}
	};

	// 更新form表单值
	var updateFormValues = function (type, typeStr, load) {
		// 设置支付方式
		global.paymentInfo.payingtype = type;
		// 判断appinfo是否存在，配置值
		if (global.appInfo) {
			global.paymentInfo.app_name = global.appInfo.packageName;
			global.paymentInfo.android_app_version = global.appInfo.version;
		} else {
			global.paymentInfo.app_name = "";
			global.paymentInfo.android_app_version = "";
		}
		// 请求二维码支付接口
		reqQrCodePay(typeStr, load);
	};

	// 载入二维码支付
	var loadQrCode = function (d, payName) {
		console.log(d);
		// 二维码数据
		global.qrcodeInfo = {
			code_url: d.code_url,
			timeout_express: d.timeout_express,
			payName: payName,
			total_fee: global.orderInfo.total_fee,
		};
		// 判断是本地开发，倒计时配置
		if (ajax.isLocal()) {
			var t = d.timeout_express;
		} else {
			var t = d.timeout_express * 60;
		}
		console.log("倒计时时间", t);
		// 载入二维码付款
		qrCode(function () {
			// 更新支付金额
			// $(".qc_price").find("span").html("<em>￥</em>" + global.orderInfo.total_fee);
			// // 更新支付二维码
			// $(".qc_img").find("img").attr("src", d.code_url);
			// // 更新过期时间
			// $(".qc_time").find("span").html(d.timeout_express + "分钟");
			// // 更新支付方式
			// $(".qc_des").text("请用" + payName + "扫描");
		}, function () {
			// 渲染模板
			return miniTpl(tpl.qrcodeTpl, global.qrcodeInfo);
		}, {
			time: t,
			maskClose: true,
			refreshHand: function (expiredHand, dom, opt, voidEL) {
				console.log("点击刷新！！！");
				reqQrCodePay(payName, true, expiredHand, dom, opt, voidEL);
				// console.log(a, b);
				// expiredHand(dom, opt, voidEL);
			},
			autoRefreshHand: function () {
				// console.log("自动刷新！！！");
			}
		});
	};


	/**
	 * 请求数据
	 * @param {Function} examine 		请求初始化信息
	 */
	// 发送系统消息、短信、卡片接口(一天只能发三次)
	var sendRemindMessage = function () {
		// 判断是请求本地json数据，请求方式设置为GET
		if (data.sendRemindMessage.flag && ajax.isLocal()){
			// 请求方式
			ajax.config.type = "get";
		}
		// 请求URL
		ajax.config.url = ajax.reqUrl(data.sendRemindMessage, siteUrl);
		// http://h.lk.cn/drugstore/tab:stock_adjust/adjust:output/act:del_document
		// 请求参数
		ajax.config.data = {
			oid: global.reqUrlInfo.oid,
		};
		console.log(ajax.config.data);
		// 请求数据
		ajax.reqDataApi(ajax.config,function (res) {
			console.log(res);
			if (res.res == 1) {
				// console.log(res.msg);
				// 提示发送成功
				alert(res.msg);
				// 判断有家庭医生，发送卡片
				if (!!global.is_family_doctor) {
					// 发送卡片消息
					sendCardMessage();
				}
			} else {
				console.log(res.msg);
				alert(res.msg);
			}
		});

	};
	// 请求订单支付信息接口
	var orderForm = function (orderId) {
		// 判断是请求本地json数据，请求方式设置为GET
		if (data.orderDetails.flag && ajax.isLocal()){
			// 请求方式
			ajax.config.type = "get";
		}
		// 请求URL
		ajax.config.url = ajax.reqUrl(data.orderDetails, siteUrl);
		// http://h.lk.cn/drugstore/tab:stock_adjust/adjust:output/act:del_document
		// 请求参数
		ajax.config.data = {
			oid: orderId,
		};
		console.log(ajax.config.data);
		// 请求数据
		ajax.reqDataApi(ajax.config,function (res) {
			console.log(res);
			if (res.res == 1) {
				// console.log(res.msg);
				// 载入订单提交信息
				loadOrderDetails(res.data);
			} else {
				console.log(res.msg);
				alert(res.msg);
				history.back();
			}
		});
	};

	// 请求二维码支付接口
	var reqQrCodePay = function (payName, flag, expiredHand, dom, opt, voidEL) {
		// 判断是请求本地json数据，请求方式设置为GET
		if (data.qrCodePay.flag && ajax.isLocal()){
			// 请求方式
			ajax.config.type = "get";
		}
		// 请求URL
		ajax.config.url = ajax.reqUrl(data.qrCodePay, siteUrl);
		// http://h.lk.cn/drugstore/tab:stock_adjust/adjust:output/act:del_document
		// 请求参数
		ajax.config.data = global.paymentInfo;
		console.log(ajax.config.data);
		// 请求完成
		ajax.config.complete = function (XMLHttpRequest, textStatus) {
			// console.log(XMLHttpRequest, textStatus);
			// console.log(global.load);
			// 判断是否销毁插件
			if (global.load) {
				// 销毁loading插件
				global.load.hide();
			}

		};
		// 请求数据
		ajax.reqDataApi(ajax.config, function (res) {
			console.log(res);
			if (res.res == 1) {
				console.log(res.msg);
				// 判断是刷新操作
				if (flag) {
					expiredHand(dom, opt, voidEL);
				} else {
					// 载入二维码
					loadQrCode(res.data, payName);
				}
			} else {
				console.log(res.msg);
				alert(res.msg);
			}

		});
	};

	/**
	 * 初始化方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var init = function (orderId, pageTitle) {
		// 获取地址栏参数, 并记录
		global.reqUrlInfo = getRequest();
		// 判断参数不存在配置默认参数
		if (isEmptyObj(global.reqUrlInfo)) {
			global.reqUrlInfo.oid = "232178";
		}
		// console.log(global.reqUrlInfo.oid);
		console.log(orderId, pageTitle);
		// 获取版本号
		getAppVersion();
		// 测试base64解码
		// getVersionAndNameForIos(code1);
		// 根据终端设置是否显示, 判断非APP载入HEADER
		if (!(android_app || ios_app || is_wx)) {
			// 引用头信息
			header(pageTitle, function (el) {
				console.log("回调方法", el);
				// 隐藏我操作
				// $(el).find(".member").hide();
			});
		}
		// 请求订单详情数据
		orderForm(orderId);
	};
	return init;
});



