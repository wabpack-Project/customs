// 组件引用
import ajax from "../vendors/ajax/config";
import miniTpl from "../vendors/mini-tpl/mini-tpl";
import header from "../vendors/header/js/header";

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
			'  <!-- end -->\n' +
			'</main>\n' +
			'<!-- 底部 -->\n' +
			'<footer>\n' +
			'  <div class="foot_opt skin3">\n' +
			'    <a href="javascript:;" class="prepare" >代付</a>\n' +
			'    <a href="javascript:;" class="wxpay" >微信收款</a>\n' +
			'    <a href="javascript:;" class="alipay" >支付宝收款</a>\n' +
			'    <a href="javascript:;" class="remind_member" >提醒会员</a>\n' +
			'  </div>\n' +
			'</footer>\n' +
			'<!-- end -->',
	};
	/**
	 * 数据
	 */
	// 接口参数和返回数据
	var data = {
		// 订单支付信息
		orderDetails : {
			reqUrl	: "ajax_dh_orderform",
			reqDevUrl	: "ajax_dh_orderform",
			reqJson : "../../service/orderDetails/orderDetails.json",
			flag		: false
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
	var loadOrderDetails = function (d) {
		// console.log(tpl);
		console.log(d);
		// 模板替换
		var _html = miniTpl(tpl.orderDetails, d);
		// 插入DOM
		$("body").append(_html);
		// 绑定事件
		bindEvent();
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
			console.log("代付！");
			// selectClickHand(id, url, this);
		});

		// 绑定微信收款事件
		$wxpay.click(function (){
			console.log("微信收款！");
			// selectClickHand(id, url, this);
		});

		// 绑定支付宝收款事件
		$alipay.click(function (){
			console.log("支付宝收款！");
			// selectClickHand(id, url, this);
		});

		// 绑定提醒会员事件
		$remind_member.click(function (){
			console.log("提醒会员！");
			// selectClickHand(id, url, this);
		});

		// 模拟点击
		// $tg_list.eq(1).click();
	};

	/**
	 * 请求数据
	 * @param {Function} examine 		请求初始化信息
	 */
	// 请求订单支付信息接口
	var orderForm = function (orderPackageId) {
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
			order_package_id: orderPackageId,
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
			}
		});
	};

	/**
	 * 初始化方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var init = function () {
		// 获取版本号
		// getAppVersion();
		// 载入HEADER， 设置标题
		header("订单详情");
		// 请求订单详情数据
		orderForm(global.orderPackageId);

	};
	return init;
});



