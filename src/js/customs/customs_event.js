// import "../vendors/Js/tool";
// var tool = require("../vendors/Js/tool");
// import ajax from "../vendors/ajax/config";
var ajax = require("../vendors/ajax/config");
// import miniTpl from "../vendors/mini-tpl/mini-tpl";
var miniTpl = require("../vendors/mini-tpl/mini-tpl");
// 图片引用
// import '../../images/customs/drugBox.png';
var reserveSrc = require('../../images/customs/reserve.png');
var registerSrc = require('../../images/customs/register.png');
var recordSrc = require('../../images/customs/record.png');
var faqSrc = require('../../images/customs/faq.png');
var imgArr = [reserveSrc, registerSrc, recordSrc, faqSrc];
var noticeSrc = require('../../images/customs/notice.png');
// var imgBanner = require('../../images/customs/banner.jpg');
// console.log(imgSrc);
/**
 * 业务逻辑
 *
 * */
;(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.customs = factory();
	}
})(this, function() {

	/**
	 * 模板
	 */
	var _tpl = {
		customs: '<!-- 图片切换 -->\n' +
			'<%\n' +
			'var bannerImg = data.banner;\n' +
			'%>\n' +
			'<div class="banner" >\n' +
			'  <img src="<%=bannerImg.url%>" >\n' +
			'</div>\n' +
			'<!-- 导航 -->\n' +
			'<div class="customs_nav">\n' +
			'  <ul class="nav_list clearfix">\n' +
			'    <%\n' +
			'    var m, navData = data.button;\n' +
			'    for(m in navData){\n' +
			'    var navInfo = navData[m];\n' +
			'    %>\n' +
			'    <li>\n' +
			'      <div class="nav_con n_m80">\n' +
			'        <a href="<%=navInfo.url%>" >\n' +
			'          <img src="<%=navInfo.picture_url%>">\n' +
			'          <span><%=navInfo.name%></span>\n' +
			'        </a>\n' +
			'      </div>\n' +
			'    </li>\n' +
			'    <%\n' +
			'    }\n' +
			'    %>\n' +
			'  </ul>\n' +
			'</div>\n' +
			'<!-- FAQ -->\n' +
			'<%\n' +
			'var m, faqInfo = data.qa_info;\n' +
			'if(faqInfo && faqInfo != {}) {\n' +
			'%>\n' +
			'<div class="notice">\n' +
			'  <div class="nt_head">\n' +
			'    <img class="fl mid" src="../images/customs/notice.png" >\n' +
			'    <a class="fr" href="<%=data.more.url%>" ><em class="iconfont iconyoujiantou fr"></em><%=data.more.button_name%></a>\n' +
			'    <span><%=data.more.title_name%></span>\n' +
			'  </div>\n' +
			'  <ul class="faq_list">\n' +
			'    <%\n' +
			'    var n = 0, faqData = faqInfo.qa, len = faqData.length;\n' +
			'    for(; n < len; n++){\n' +
			'    var faqConInfo = faqData[n];\n' +
			'    %>\n' +
			'    <li>\n' +
			'      <div class="faq_tit"><%=faqConInfo.question%></div>\n' +
			'      <div class="faq_des"><%=faqConInfo.answer%></div>\n' +
			'    </li>\n' +
			'    <%\n' +
			'    }\n' +
			'    %>\n' +
			'  </ul>\n' +
			'</div>\n' +
			'<%\n' +
			'}\n' +
			'%>\n' +
			'<!-- end -->',
	};

	/**
	 * 数据
	 */
		// 接口参数和返回数据
	var data = {
			customs: {
				reqUrl	: "2/lancare_customhouse_interface_Tianjin/api:home_page",
				reqDevUrl	: "2/lancare_customhouse_interface_Tianjin/api:home_page",
				reqJson : "../../src/data/customs.json",
				flag		: false
			},
			cacheCustoms: "",
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
			var _html = miniTpl(_tpl.customs, data.cacheCustoms);
			// 插入DOM
			$(".wui_wrapper").append(_html);
			// 替换FAQ图标
			$(".nt_head").find("img").attr("src", noticeSrc);
			// 判断图片数组是否存在，替换导航图标
			if (imgArr.length > 0){
				$(".nav_list li").each(function (n) {
					$(this).find("img").attr("src", imgArr[n]);
				});
			}
			// 判断是否显示更多
			if (!data.cacheCustoms.more.boolean_more){
				$(".nt_head").find("a").hide();
			}
			// 绑定事件
			// bindEvent(id);
		};

	/**
	 * 请求数据
	 * @param {Function} examine 		请求初始化信息
	 */
	// 请求预约信息接口
	var customs = function (id) {
		// 请求URL
		ajax.config.url = ajax.reqUrl(data.customs);
		// http://h.lk.cn/drugstore/tab:stock_adjust/adjust:output/act:del_document
		// 请求参数
		ajax.config.data = {
			// user_id: id,
			// application_form_context_identifier: ""
		};
		// console.log(ajax.config.data);
		// 请求数据
		ajax.reqDataApi(ajax.config,function (res) {
			console.log(res);
			if (res.ResultCode == 1) {
				console.log(res.Result);
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

	/**
	 * 初始化方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var init = function (id) {
		// console.log("初始化！！！");
		// _tpl = tpl;
		customs(id);
	};

	// 提供外部调用的参数和方法
	return init;

});