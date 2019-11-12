// 模板
var tpl = '<div class="popup">\n' +
	'  <div class="popup_mask"></div>\n' +
	'  <div class="popup_out">\n' +
	'    <div class="pop_head">\n' +
	'      <div class="qc_price">支付金额：<span><em>￥</em>1256.25</span></div>\n' +
	'    </div>\n' +
	'    <div class="pop_body">\n' +
	'      <div class="qrCode">\n' +
	'        <div class="qc_img"><img src="../../../asset/images/qrcode.jpg"></div>\n' +
	'        <div class="qc_time">距离二维码过期还剩 <span>1分15秒</span></div>\n' +
	'        <div class="qc_des">请用微信扫描</div>\n' +
	'      </div>\n' +
	'    </div>\n' +
	'  </div>\n' +
	'</div>';

// 数据
var data = {};


android_app = false;
ios_app = false;
is_wx = false;

// 根据终端设置是否显示
// if (!(android_app || ios_app || is_wx)) {
  // 第一种 数据替换模板方式
	// 加载二维码
	// /*
	qrCode(function () {
		return miniTpl(tpl, data);
	}, function (el) {
		// 对应绑定事件和回调处理
		console.log("回调函数！！！");
		console.log(el);
	});
	// */

	// 第二种 直接传入模板
	// 加载二维码
	// qrCode(tpl, function () {
	// 	console.log("事件绑定！！！");
	// });

	// 第三种没有参数直接跳出
	// 加载二维码
	// qrCode();

// }




